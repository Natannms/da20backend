const database = require("../../sequelize/models");
class PhoneController {
  static async create(req, res) {
    const { contact_id, number } = req.body;
    const phone = await database.Phones.create({
      contact_id,
      number,
    });

    if (!phone) {
      res.status(400).send({ message: "Não foi possível criar novo contato" });
      return;
    }

    res.status(201).send({ message: "Criado com sucesso" });
  }

  static async getAll(req, res) {
    const phone = await database.Phones.findAll({
      include: { model: database.Contact, as: "contact" },
    });
    if (!phone) {
      res.status(400).send({ message: "not founded" });
    }

    res.status(200).send({ data: phone });
  }

  static async getOne(req, res) {
    const { id } = req.params;

    const phone = await database.Phones.findAll({
      where: {
        id,
      },
      include: { model: database.Contact, as: "contact" },
    });

    if (!phone) {
      res.status(400).send({ message: "not founded" });
    }

    res.send({ data: phone });
  }

  static async update(req, res) {
    const { id } = req.params;
    const { number } = req.body;

    const phone = await database.Phones.findByPk(id);

    if (!phone) {
      res.status(400).send({ message: "not founded" });
    }

    phone.number = number && number;
    phone.save();

    res.status(200).send({ message: "atualizado com sucesso!" });
  }
  static async delete(req, res) {
    const { id } = req.params;

    const phone = await database.Phones.findByPk(id);

    if (!phone) {
      res.status(400).send({ message: "not founded" });
    }
    phone.destroy();

    res.send({ message: "Deletado com sucesso !" });
  }
}

module.exports = PhoneController;
