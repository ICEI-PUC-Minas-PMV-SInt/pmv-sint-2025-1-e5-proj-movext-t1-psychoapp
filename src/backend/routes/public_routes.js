import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { upload, uploadToGoogleDrive } from "../multer.js";

const router = express.Router();

//ROTAS PARA CADASTRO DE USUÁRIO, PROFISSIONAL E PACIENTE

router.post("/cadastro", async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const dadosInformados = req.body;

    const hashPassword = await bcrypt.hash(dadosInformados.password, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        name: dadosInformados.name,
        cpf: dadosInformados.cpf,
        email: dadosInformados.email,
        telefone: dadosInformados.telefone,
        dataNascimento: new Date(dadosInformados.dataNascimento),
        cidade: dadosInformados.cidade,
        estado: dadosInformados.estado,
        password: hashPassword,
        tipoPerfil: dadosInformados.tipoPerfil,
      },
    });

    res
      .status(201)
      .json({
        message: `Usuário ${novoUsuario.name} Cadastrado com sucesso.`,
        id: novoUsuario.id,
      });
    } catch (err) {
      // Log detalhado do erro no console
      console.error("Erro ao cadastrar usuário:", err);
  
      res.status(500).json({
        message: `Erro ao cadastrar usuário. O servidor retornou: ${err.message}`,
      });
    }
  });

router.post(
  "/cadastro-profissional",
  upload.single("profileimg"),
  async (req, res) => {
    try {
      const prisma = new PrismaClient();
      const dadosInformados = req.body;

      // Verifica se o arquivo foi enviado
      if (!req.file) {
        return res.status(400).json({ message: "Imagem de perfil não enviada." });
      }

      const filePath = req.file.path;
      const fileName = req.file.filename;

      // Faz o upload da imagem para o Google Drive
      const googleDriveFileId = await uploadToGoogleDrive(filePath, fileName);

      // Salva os dados no banco de dados
      await prisma.profissional.create({
        data: {
          tipoAtendimento: dadosInformados.tipoAtendimento,
          trajetoriaProfissional: dadosInformados.trajetoriaProfissional,
          profileimg: googleDriveFileId, // Salva o ID do arquivo no Google Drive
          usuarioId: dadosInformados.usuarioId,
        },
      });

      res
        .status(201)
        .json({ message: `Perfil de profissional associado com sucesso.` });
    } catch (err) {
      console.error("Erro ao cadastrar profissional:", err);
      res.status(500).json({
        message: `Erro ao cadastrar profissional. O servidor retornou: ${err}`,
      });
    }
  }
);

router.post(
  "/cadastro-paciente",
  upload.single("profileimg"),
  async (req, res) => {
    try {
      const prisma = new PrismaClient();
      const dadosInformados = req.body;

      // Verifica se o arquivo foi enviado
      if (!req.file) {
        return res.status(400).json({ message: "Imagem de perfil não enviada." });
      }

      const filePath = req.file.path;
      const fileName = req.file.filename;

      // Faz o upload da imagem para o Google Drive
      const googleDriveFileId = await uploadToGoogleDrive(filePath, fileName);

      const diagnostico = dadosInformados.diagnostico === "true";

      // Salva os dados no banco de dados
      await prisma.paciente.create({
        data: {
          necessidadeAtendimento: dadosInformados.necessidadeAtendimento,
          diagnostico: diagnostico,
          qualDiagnostico: dadosInformados.qualDiagnostico,
          encaminhamento: dadosInformados.encaminhamento,
          queixas: dadosInformados.queixas,
          profileimg: googleDriveFileId, // Salva o ID do arquivo no Google Drive
          usuarioId: dadosInformados.usuarioId,
        },
      });

      res
        .status(201)
        .json({ message: `Perfil de paciente associado com sucesso.` });
    } catch (err) {
      console.error("Erro ao cadastrar paciente:", err);
      res.status(500).json({
        message: `Erro ao cadastrar paciente. O servidor retornou: ${err}`,
      });
    }
  }
);

//ROTA PARA LOGIN

router.post("/login", async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const dadosInformados = req.body;

    const usuarioBD = await prisma.usuario.findUnique({
      where: {
        email: dadosInformados.email,
      },
    });

    if (!usuarioBD) {
      res.status(401).json({ message: "Usuário ou senha inválidos." });

    } else {
      const senhaValidada = await bcrypt.compare(
        dadosInformados.password,
        usuarioBD.password
      );

      if (!senhaValidada) {
        res.status(401).json({ message: "Usuário ou senha inválidos." });

      } else {
        const JWT_SECRET = process.env.JSON_SECRET;
        const token = jwt.sign({id: usuarioBD.id}, JWT_SECRET, {expiresIn: '60m'})

        res
          .status(200)
          .json({ message: "Login realizado com sucesso.", token: token });
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({
        message: `Erro ao realizar login. O servidor retornou: ${err}`,
      });
  }
});


export default router;