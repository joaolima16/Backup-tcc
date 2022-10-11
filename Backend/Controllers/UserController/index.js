
class Users{
    static async index(){
        /* 
            #swagger.tags = ['Users controll']
            #swagger.description = "Autenticação de usuário"
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }

            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
        */
    }     

    static async create(){
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Criação de usuário"
        */
        /*  
            #swagger.parameters['name']={
                description:'Nome do usuário',
                type:'string',
                required:true,
                in:'body',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }        

            #swagger.parameters['image']={
                description:'Imagem do usuário, enviado por um input type file',
                type:'object',
                required:true,
                in:'body',
            }
            
            #swagger.parameters['office']={
                description:'Cargo do usuário, admin ou docente',
                type:'string',
                required:true,
                in:'body',
                example:'docente',
            }
            
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }
            
            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
        */
    }

    static async update(){
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Atualização de usuário"
        */
        /*
            #swagger.parameters['token']={
                description:'Token do usuário',
                type:'string',
                required:true,
                in:'header',
                example:'X-Access-Token: <token>',
            }

            #swagger.parameters['name']={
                description:'Nome do usuário (principal dado)',
                type:'string',
                required:true,
                in:'body',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }        

            #swagger.parameters['image']={
                description:'Imagem do usuário, enviado por um input type file',
                type:'object',
                required:true,
                in:'body',
            }
            
            #swagger.parameters['office']={
                description:'Cargo do usuário, admin ou docente',
                type:'string',
                required:true,
                in:'body',
                example:'docente',
            }
            
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }
            
            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
        */
    }

    static async delete(){
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Remoção de usuário"
        */
        /*
            #swagger.parameters['token']={
                description:'Token do usuário',
                type:'string',
                required:true,
                in:'header',
                example:'X-Access-Token: <token>',
            }

            #swagger.parameters['name']={
                description:'Nome do usuário',
                type:'string',
                required:true,
                in:'query',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }
        */
    }
}

module.exports = Users;
