import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import upload from "../multer.js";

const router = express.Router();

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
        password: hashPassword
      }
    })

    res.status(201).json({message: `Usuário ${novoUsuario.name} Cadastrado com sucesso.`, id: novoUsuario.id})

  } catch (err) {

    res.status(500).json({message: `Erro ao cadastrar usuário. O servidor retornou: ${err}`});
  }

});

router.post("/cadastro-profissional", upload.single("profileimg"), async (req, res) => {

    try {
      const prisma = new PrismaClient();
      const dadosInformados = req.body;
      const profileimg = req.file ? req.file.filename : null;

      await prisma.profissional.create({
        data: {
          tipoAtendimento: dadosInformados.tipoAtendimento,
          trajetoriaProfissional: dadosInformados.trajetoriaProfissional,
          profileimg: profileimg,
          usuarioId: dadosInformados.usuarioId
        },
      });

      res.status(201).json({ message: `Perfil de profissional associado com sucesso.` });
      
    } catch (err) {

        res.status(500).json({
          message: `Erro ao cadastrar usuário. O servidor retornou: ${err}`
          
        });
    }
  }
);

export default router;


//CRIEI O SISTEMA DE CADASTRO DE USUÁRIO E TAMBÉM DE CADASTRO DE PROFISSIONAL, EM QUE JÁ ACONTECE A ASSOCIAÇÃO ENTRE O USUÁRIO E O PROFISSIONAL.
// É NECESSÁRIO GUARDAR O ID DO USUÁRIO PARA SER INVOCADO NA REQUISIÇÃO DE CADASTRO DE PROFISSIONAL. ALGO COMO LOCALSTORAGE NA RES DO USUÁRIO
// CONTINUAR AGORA MONTANDO O MESMO ESQUEMA PARA O PACIENTE.
