import * as Yup from 'yup';
import Recipient from '../models/Recipients';

class RecipientsController {
  // Cadastro de destinatario / recipient registration
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().notRequired(),
      uf: Yup.string().required().length(2),
      city: Yup.string().required(),
      zip_code: Yup.string().required().length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Erro: 'Validation failed!' });
    }

    // Desestruturando dados da requisição que vem do body e adicionando no banco de dados
    // Destructuring data from the request that comes from the body and adding it to the database

    const { name, street, number, complement, uf, city, zip_code } = req.body;

    const { id } = await Recipient.create({
      name,
      street,
      number,
      complement,
      uf,
      city,
      zip_code,
    });

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      uf,
      city,
      zip_code,
    });
  }

  // criar o update de dados do destinatário / create recipient data update
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      uf: Yup.string().length(2),
      city: Yup.string(),
      zip_code: Yup.string().length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Erro: 'Validation failed!' });
    }

    // verificando se destinatário existe / checking if recipient exists
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ Error: 'Recipient does not exist!' });
    }

    // Realizando a desestruturação e atualizando os dados / Destructuring and updating the data

    const { name, street, number, complement, uf, city, zip_code } = req.body;

    await recipient.update({
      name,
      street,
      number,
      complement,
      uf,
      city,
      zip_code,
    });
    return res.json({
      name,
      street,
      number,
      complement,
      uf,
      city,
      zip_code,
    });
  }
}

export default new RecipientsController();
