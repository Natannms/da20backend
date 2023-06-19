const { Op } = require("sequelize");
const database = require("../../sequelize/models");
const fs = require('fs');
const path = require('path');

class UserController {

  static async create(req, res) {
    const { name, age, number } = req.body;
    try {
      const contact = await database.Contact.create({
        name,
        age,
      });

      if (!contact) {
        res.status(400).send({ message: "Não foi possível criar novo contato" });
        return;
      }

      const phone = await database.Phones.create({
        contact_id: contact.id, // Use "contactId" instead of "contact_id"
        number,
      });

      if (!phone) {
        await contact.destroy();
        res.status(400).send({ message: "Não foi possível criar novo telefone" });
        return;
      }

      res.status(200).send({ message: "Contato e telefone criados com sucesso", contact, phone });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Erro ao criar contato e telefone" });
    }
  }
  static async getAll(req, res) {

    let options ={
      include: { model: database.Phones },
      order: [['createdAt', 'DESC']]
    };


    const {keyword} = req.query
    if(keyword){
      console.log(keyword)
      options.where = {
        name: {
          [Op.like]: `%${keyword}%`
        }
      }
    }

    const contacts = await database.Contact.findAll(options);
    if (!contacts) {
      res.status(400).send({message: "not founded"})
    }

    res.send(contacts)
  }
  static async getOne(req, res) {
    const {contact_id} = req.params

    const contacts = await database.Contact.findOne({
      where:{
        id:contact_id
      },
      include: { model: database.Phones }
    });

    if (!contacts) {
      res.status(400).send({message: "not founded"})
    }

    res.send(contacts)
  }
  static async update(req, res) {
    const {contact_id} = req.params
    const {  name, age } = req.body

    const contacts = await database.Contact.findByPk(contact_id);

    if (!contacts) {
      res.status(400).send({message: "not founded"})
    }

    contacts.name =  name && name
    contacts.age =  age && age
    contacts.save()

    res.send({data:contacts, message: "Alterado com sucesso."})
  }
  static async delete(req, res) {
    const {contact_id} = req.params

    const contacts = await database.Contact.findByPk(contact_id);

    if (!contacts) {
      res.status(400).send({message: "not founded"})
    }
    contacts.destroy()

    let logText = `${contacts.name} [ DELETED ]`
    const logFilePath = path.join('./', 'Logs', 'exclusions.log.txt');
    const logEntry = `[${new Date().toISOString()}] ${logText}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Erro ao criar log:', err);
      } else {
        console.log('Log criado com sucesso.');
      }
    });

    res.status(200).send({message: "Deletado com sucesso !"})
  }
}

module.exports = UserController;
