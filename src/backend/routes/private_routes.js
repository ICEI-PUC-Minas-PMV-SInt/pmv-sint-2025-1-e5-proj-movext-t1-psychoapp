import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import upload from "../multer.js";

const router = express.Router();

//ROTA PRIVADA PARA LISTAR PROFISSIONAIS

router.get("/list-profissionais", async (req, res) => {
  const prisma = new PrismaClient();

  try{

    if (req.query.cidade){

        const filtroCidade = await prisma.usuario.findMany({
            where: {
            paciente: null,
            cidade: req.query.cidade,
            },
            include: {
            profissional: true,
            },
            omit: {
                password: true,
            },
        })
    
        res.status(200).json(filtroCidade)

    } else if (req.query.estado){
        const estado = req.query.estado.toString().toUpperCase()
        const filtroEstado = await prisma.usuario.findMany({
            where: {
            paciente: null,
            estado: estado,
            },
            include: {
            profissional: true,
            },
            omit: {
                password: true,
            },
        })
    
        res.status(200).json(filtroEstado)

    } else {

        const profissionais = await prisma.usuario.findMany({
            where: {
                paciente: null,
            },
            include: {
                profissional: true,
            },
            omit: {
                password: true,
            },
        })
    
        res.status(200).json(profissionais)

    }


  }catch(err){
    res.status(500).json({message: `Erro ao listar profissionais. O servidor retornou: ${err}`})
  }
})

//ROTA PRIVADA PARA LISTAR PACIENTES

router.get("/list-pacientes", async (req, res) => {
    const prisma = new PrismaClient();
  
    try{
  
      if (req.query.cidade){
  
          const filtroCidade = await prisma.usuario.findMany({
              where: {
              profissional: null,
              cidade: req.query.cidade,
              },
              include: {
              paciente: true,
              },
              omit: {
                  password: true,
              },
          })
      
          res.status(200).json(filtroCidade)
  
      } else if (req.query.estado){
          const estado = req.query.estado.toString().toUpperCase()
          const filtroEstado = await prisma.usuario.findMany({
              where: {
              profissional: null,
              estado: estado,
              },
              include: {
              paciente: true,
              },
              omit: {
                  password: true,
              },
          })
      
          res.status(200).json(filtroEstado)
  
      } else {
  
          const profissionais = await prisma.usuario.findMany({
              where: {
                  profissional: null,
              },
              include: {
                  paciente: true,
              },
              omit: {
                  password: true,
              },
          })
      
          res.status(200).json(profissionais)
  
      }
  
  
    }catch(err){
      res.status(500).json({message: `Erro ao listar profissionais. O servidor retornou: ${err}`})
    }
  })

  // ROTAS PARA ALTERAÇÃO E EXCLUSÃO DE USUÁRIOS

  // ALTERAR USUÁRIO PROFISSIONAL:

  router.put("/usuario-profissional/:id",upload.single("profileimg"), async (req, res) => {

    const prisma = new PrismaClient()
    const dadosInformados = req.body;
    const profileimg = req.file ? req.file.filename : null;

    const usuarioAtualizado = await prisma.usuario.update({
        where: {
            id: req.params.id,
        },
        data: {
            name: dadosInformados.name || undefined,
            cpf: dadosInformados.cpf || undefined,
            email: dadosInformados.email || undefined,
            telefone: dadosInformados.telefone || undefined,
            dataNascimento: dadosInformados.dataNascimento || undefined,
            cidade: dadosInformados.cidade || undefined,
            estado: dadosInformados.estado || undefined,
            password: dadosInformados.password ? await bcrypt.hash(dadosInformados.password, 10) : undefined,

                profissional: {
                    update: {
                    tipoAtendimento: dadosInformados.tipoAtendimento || undefined,
                    trajetoriaProfissional: dadosInformados.trajetoriaProfissional || undefined,
                    profileimg: profileimg || undefined,
                    },
                },
        },
        include: {
            profissional: true,
        },
        omit: {
            password: true,
            paciente: true,
        },
    })

    res.status(200).json({message: "Usuário atualizado com sucesso.", dadosUsuario: usuarioAtualizado})

  })

// ALTERAR USUÁRIO PACIENTE:

// ALTERAR USUÁRIO PROFISSIONAL:

router.put("/usuario-paciente/:id", upload.single("profileimg"), async (req, res) => {
    const prisma = new PrismaClient();
    const dadosInformados = req.body;
    const profileimg = req.file ? req.file.filename : null;
  
    try {
      // Atualizar os dados do usuário e do paciente relacionados
      const usuarioAtualizado = await prisma.usuario.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: dadosInformados.name || undefined,
          cpf: dadosInformados.cpf || undefined,
          email: dadosInformados.email || undefined,
          telefone: dadosInformados.telefone || undefined,
          dataNascimento: dadosInformados.dataNascimento || undefined,
          cidade: dadosInformados.cidade || undefined,
          estado: dadosInformados.estado || undefined,
          password: dadosInformados.password ? await bcrypt.hash(dadosInformados.password, 10) : undefined,
          paciente: {
            update: {
              necessidadeAtendimento: dadosInformados.necessidadeAtendimento || undefined,
              diagnostico: dadosInformados.diagnostico ? dadosInformados.diagnostico === "true" : undefined,
              qualDiagnostico: dadosInformados.qualDiagnostico || undefined,
              encaminhamento: dadosInformados.encaminhamento || undefined,
              queixas: dadosInformados.queixas || undefined,
              profileimg: profileimg || undefined,
            },
          },
        },
        include: {
          paciente: true,
        },
        omit: {
          password: true,
          profissional: true,
        },
      });
  
      res.status(200).json({
        message: "Usuário atualizado com sucesso.",
        dadosUsuario: usuarioAtualizado,
      });
    } catch (err) {
      res.status(500).json({
        message: `Erro ao atualizar usuário. O servidor retornou: ${err}`,
      });
    } finally {
      await prisma.$disconnect();
    }
  });

  // EXCLUIR USUÁRIO:

    router.delete("/usuario-delete/:id", async (req, res) => {
        const prisma = new PrismaClient()

        try{

            const usuarioDeletado = await prisma.usuario.delete({
                where: {
                    id: req.params.id,
                },
            })

            res.status(200).json({message: "Usuário excluído com sucesso.", userEmail: usuarioDeletado.email})


        }catch(err){
            res.status(500).json({message: `Erro ao excluir usuário. O servidor retornou: ${err}`})
    }

})


export default router;
