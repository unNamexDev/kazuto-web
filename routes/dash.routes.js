const { Router } = require('express');
const { auth } = require('../util/middleware/auth');
const router = Router();
const Client = require('../server/bot')
router.get('/dash', auth, async(req, res) => {

    let servidores = [];
    let guilds = req.user.guilds.filter(f => (f.permissions & 32) == 32); 
    req.bot = Client;
 for(const key in guilds){ 
        let servidor = req.bot.guilds.cache.get(guilds[key].id)
        if(servidor){ 
            if(servidor.icon){ 
                servidores.push({
                    in: true,
                    id: servidor.id,
                    name: servidor.name,
                    icon: servidor.icon
                });
            }else{ // Si no tiene
                servidores.push({
                    in: true,
                    id: servidor.id,
                    name: servidor.name
                });
            }
        }else{ // Si el bot no esta en el servidor
            if(guilds[key].icon){
                servidores.push({
                    in: false,
                    id: guilds[key].id,
                    name: guilds[key].name,
                    icon: guilds[key].icon
                });
            }else{
                servidores.push({
                    in: false,
                    id: guilds[key].id,
                    name: guilds[key].name,
                });
            }
        }
    }


    res.render('dash', {
        user: req.user,
        bot: req.bot,
        guilds: servidores
    }); 
});

const Prefix = require('../database/models/Prefix.js');

router.get('/dash/:id', auth, async (req, res) => {
let prefix = await Prefix.findOne({id: req.params.id});

    prefix = prefix ? prefix['prefix'] : req.bot;

    res.render('main', {
        id: req.params.id,
        prefix: prefix
    });
});


router.post('/dash/:id/prefix', async (req, res) => {
    let newPrefix = req.body;
    let dbPrefix = new Prefix({id: req.params.id, newPrefix});
    let DBprefix = await Prefix.findOne({id: req.params.id});

    let prefix = DBprefix ? DBprefix['prefix'] : req.bot;

    let errors = []; 

    if(!newPrefix){
        errors.push({ text: 'No has ingresado un prefix' });
    }
    if(newPrefix == prefix){
        errors.push({ text: 'No se ha realizado ningun cambio' });
    }
    if(newPrefix.length > 4){  
        errors.push({ text: 'El prefix sobrepasa el maximo de caracteres (4)' })
    }
    // Si el usuario ha cometido alguno de los errores
    if(errors.length > 0){
         res.render('main', {
              id: req.params.id,
              prefix: prefix,
              errors: errors
         })
    }else{
         DBprefix ? await DBprefix.updateOne({prefix: newPrefix}) : await dbPrefix.save();
         await res.render('main', {
             id: req.params.id,
             prefix: newPrefix,
             message: `El prefix se ha actualizado a ${newPrefix}`
         });
    }
});

module.exports = router;