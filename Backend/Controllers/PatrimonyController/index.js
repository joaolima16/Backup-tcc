const fs = require('fs');
const path = require('path');
const Controller = require('../Controller');
const PatrimonyModel = require('../../models/PatriTable');
const PatrimonyTable = PatrimonyModel.Table;
const QRCodeTable = require('../../models/QrCodeTable');
const QRCodeController = require('../QRCodeController');
const RoomTable = require('../../Models/RoomTable');
const DepartmentTable = require('../../Models/DepTable');
const QrCodeTable = require('../../models/QrCodeTable');
const QRCode = new QRCodeController();
const RelationshipController = new Controller();
class PatrimonyController{
    static async index(req, res){
        /*
            #swagger.tags = ['Patrimony controll']
            #swagger.description = "Envio de dados referente a patrimônios, podendo ser por sala ou apenas um patrimônio em uma sala".
        */
        /*
            #swagger.parameters['department']={
                description:'Nome do departamento da sala',
                type:'string',
                required:true,
                in:'path',
                example:'.../laboratory/...'
            }

            #swagger.parameters['room']={
                description:'Numero da sala',
                type:'integer',
                required:true,
                in:'path',
                example:'.../laboratory/1'
            }
            
            #swagger.parameters['patrimony']={
                description:'ID do patrimônio específico',
                type:'integer',
                required:false,
                in:'query',
                example:'.../laboratory/1?patrimony=1'
            }
        */
        const {room, department} = req.params;
        const patrimonyId = req.query?.patrimony;
        try{
            await Controller.DepartmentsRooms();
            await Controller.PatrimonyRoom();
            PatrimonyTable.hasOne(QRCodeTable,{foreignKey:{allowNull:false}});
            QRCodeTable.belongsTo(PatrimonyTable,{foreignKey:{allowNull:false}});
            var patrimony;
            if(patrimonyId){
               patrimony = await DepartmentTable.findAll({
                where:{name:department},
                include:{
                    model:RoomTable,
                    where:{nRoom:room},
                    include:{
                        model:PatrimonyTable,
                        where:{id:patrimonyId},
                        include:QRCodeTable
                    }
                }
            });
            }else{
                patrimony = await DepartmentTable.findOne({
                    where:{name:department},
                    include:{
                        model:RoomTable,
                        where:{nRoom:room},
                        include:{
                            model:PatrimonyTable,
                            include:QRCodeTable
                        }
                    }
                })
            }
        res.status(200).json(patrimony);
        }catch(error){
            if(error) console.log(error);
            res.status(404).send('[ERROR] Patrimony not found !');
        }
    }
    
    static async create(req, res) {
        /*
            #swagger.tags = ['Patrimony controll']
            #swagger.description = "Criação de patrimônio via Formulário"
            #swagger.parameters['numpatrimony']={
                description:'Código de identificação do patrimônio.',
                type:'string',
                required:true,
                in:'body',
                example:'1234567',
            }
            
            #swagger.parameters['type']={
                description:'Classificação do patrimônio.',
                type:'string',
                enum:['cadeira','projetor','pc', 'mesa'],
                required:true,
                in:'body',
            }

            #swagger.parameters['status']={
                description:'A primeira linha da tabela, onde contém o cabeçalho das colunas.',
                type:'String',
                enum:['manutencao','em_uso','em_falta'],
                required:false,
                in:'body',
            }

            #swagger.parameters['image']={
                description:'Imagem de representação do patrimônio.',
                type:'file',
                in:'formData',
                required:false
            }

            #swagger.parameters['description']={
                description:'Nome/descrição do patrimônio.',
                type:'String',
                in:'body',
                required:true,
                example:'Monitor DELL Modelo 1234'
            }

            #swagger.parameters['idroom']={
                description:'ID da sala do patrimônio.',
                type:'String',
                in:'path',
                required:true,
                example:1
            }
        */
       const Qrcode = new QRCodeController();
        const{ 
            codePatrimony,
            type,
            local,
            valuePatrimony,
            situation
        } = await req.body; // Recebendo os dados para as funções
        console.log(req.body)
        const id_room = req.params.id; // Recebendo

        try{

            RoomTable.hasMany(PatrimonyTable,{foreignKey:{allowNull:false}});
            PatrimonyTable.belongsTo(RoomTable,{foreignKey:{allowNull:false}});
            console.log(situation)
            await PatrimonyTable.create({
                nPatrimony: codePatrimony,
                image: "teste.png",
                description: "teste",
                type: type,
                status: situation,
                value:valuePatrimony,
                roomId: id_room
            
            });

              Qrcode.create(`${codePatrimony}-Qrcode.png`,codePatrimony);
              const PatrimonyData = await PatrimonyTable.findOne({where:{
                nPatrimony: codePatrimony
              }})

              const PatrimonyId = await PatrimonyData.id
              const ImagePath = path.resolve(__dirname,`../../public/${codePatrimony}-Qrcode.png`)
    
              await PatrimonyTable.hasOne(QrCodeTable,{foreignKey:{allowNull:false}});
              await QrCodeTable.belongsTo(PatrimonyTable,{foreignKey:{allowNull:false}});

              QrCodeTable.create({
                pathImage:ImagePath,
                patrimonyId:PatrimonyId
              })
       
              res.status(201).json({msg:"New Patrimony created"});      
        }catch(error){
            if(error) console.log(error);
            res.status(500).json({msg:"[ERROR] Failed in create new patrimony"});
        }    
    }

    static async createByExcel(req, res){
        /*
            #swagger.tags = ['Patrimony controll']
            #swagger.description = "Criação de patrimônios via arquivo .xlsx <br/> [Acione a rota duas vezes]"
            #swagger.parameters['colnames']={
                description:'Nome da coluna com os nomes dos items.',
                type:'string',
                required:true,
                in:'body',
                example:'modelo_itens',
            }
            
            #swagger.parameters['colcodes']={
                description:'Nome da coluna com os códigos de patrimônio.',
                type:'string',
                required:true,
                in:'body',
                example:'codigos',
            }

            #swagger.parameters['initialLine']={
                description:'A primeira linha da tabela, onde contém o cabeçalho das colunas.',
                type:'integer',
                in:'body',
                example:1
            }
        */
        try{
            const { colcodes, colnames, initialLine} = req.body;
            const [ excel ] = req.files.excel;
           
            QRCode.createJsonConfig(excel.filename,colcodes,colnames, initialLine);
            await QRCode.allCodes();
            var {codes} = QRCode.getArrCodes();
            if(codes){
                codes.map(async ({name, code})=>{
                    const nameQrCode = `QRProduct-${code}.png`;
                    await QRCode.create(nameQrCode,code);
                    const enumTypes = PatrimonyModel.enumTypes;
                    var index = 0;
                    // tipo na descrição do patrimônio:
                    if(enumTypes.some((type)=>String(name).toLowerCase().includes(type))){
                        PatrimonyTable.belongsTo(RoomTable,{foreignKey:{allowNull:false}});
                        QRCodeTable.belongsTo(PatrimonyTable,{foreignKey:{allowNull:false}});
                        const patrimonyResult = await PatrimonyTable.create({
                            nPatrimony:code,
                            image:null,
                            description:name,
                            type:enumTypes[index],
                            status:null,
                            roomId:1
                        });
                        await QRCodeTable.create({
                            pathImage: `${req.protocol}://${req.headers.host}/${nameQrCode}`,
                            patrimonyId: patrimonyResult.id
                        });
                    }
                });
                fs.unlinkSync(excel.path);
            }
            res.status(201).json({msg:"Insert process sucessful"});
        }
        catch(error){
            if(error) console.log(error);
            res.status(500).json({msg:"[ERROR] insert excel to system failed"});
        }
    }

    static async update(req, res){
        /*
            #swagger.tags = ['Patrimony controll']
            #swagger.description = "Modificação de patrimônio via Formulário"
            #swagger.parameters['numpatrimony']={
                description:'Código de identificação do patrimônio.',
                type:'string',
                required:true,
                in:'body',
                example:'1234567',
            }
            
            #swagger.parameters['type']={
                description:'Classificação do patrimônio.',
                type:'string',
                enum:['cadeira','projetor','pc', 'mesa'],
                required:true,
                in:'body',
            }

            #swagger.parameters['status']={
                description:'A primeira linha da tabela, onde contém o cabeçalho das colunas.',
                type:'String',
                enum:['manutencao','em_uso','em_falta'],
                required:false,
                in:'body',
            }

            #swagger.parameters['image']={
                description:'Imagem de representação do patrimônio.',
                type:'file',
                in:'formData',
                required:false
            }

            #swagger.parameters['description']={
                description:'Nome/descrição do patrimônio.',
                type:'String',
                in:'body',
                required:true,
                example:'Monitor DELL Modelo 1234'
            }

            #swagger.parameters['idroom']={
                description:'ID da sala do patrimônio.',
                type:'String',
                in:'path',
                required:true,
                example:1
            }
        */
        const { oldnumber, newnumber, type, status, image, description, idroom } = await req.body;
        
        // modificação: add multer na rota e modificar o código;
        try{
            
            await PatrimonyTable.update({ 
                nPatrimony: newnumber,
                image,
                description,
                type,
                status,
                idRoom:idroom
            }, {where: {nPatrimony: oldnumber},
                limit:1
            });
            QRCode.deleteQrcode(oldnumber);
            QRCode.create(`${newnumber}-Qrcode.png`,newnumber);
            res.status(200).json({msg:"Patrimony modified!"});
        }catch(error){
            if(error) console.log(error);
            res.status(304).json({msg:"[ERROR] Failed to modified patrimony!"});
        }
    }
    
    static async delete(req, res){
        /*
            #swagger.tags = ['Patrimony controll']
            #swagger.description = "Deletar QRCode da pasta public e da base de dados a partir de um id"
        */
        /*
                #swagger.parameters['id']={
                    description:"Insira o id do item que deseja excluir",
                    type:"integer",
                    required:true,
                }
        */
        try{
            Controller.PatrimonyQrCode();
        const {numpatrimony} = req.body;
        const Patrimony = await PatrimonyTable.findOne({where:numpatrimony},{include:QRCodeTable})
        

        if(Patrimony){
            const id_Patrimony = Patrimony.id;
            Patrimony.destroy({where:id_Patrimony});
            QRCode.deleteQrcode(numpatrimony);         
        }

        }catch(err){
            console.log(err.message)
        }
    }

    static async Filter(req,res){
           /*
            #swagger.tags = ['Patrimony controll']
            #swagger.description = "Filtrar os patrimônios,departamentos e salas existentes"
        */
        /*
                #swagger.parameters['type']={
                    description:"Insira o tipo de patrimônio que você deseja. Ex: cadeira",
                    type:"String",
                    required:true,
                }
                 #swagger.parameters['department']={
                    description:"Insira o nome do deparmento que você deseja. Ex: sala",
                    type:"String",
                    required:true,
                }
                 #swagger.parameters['room']={
                    description:"Insira o número da sala que você deseja. Ex: 10",
                    type:"integer",
                    required:true,
                }
        */
        try {
            const { room, department,type} = req.params;
            const {value} = req.body;


           
            await Controller.DepartmentsRooms();
            await Controller.PatrimonyRoom();

            
      const FilterPatrimony = await DepartmentTable.findAll({where:{name: department}, 
            include: {
                model:RoomTable,
                where: {nRoom: room}, 
            include:{
                model: PatrimonyTable, 
                where: {type:type}
            }
        }
            });
            if(FilterPatrimony){
                res.json({FilterPatrimony})
            }
        }
        catch (err) {
            if (err) console.log(err);
            res.status(500).json({ message: "[ERROR] Can't exclude content" });
          }
    }
}
module.exports = PatrimonyController;