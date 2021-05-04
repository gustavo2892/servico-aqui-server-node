import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // Método estático
  static init(sequelize) {
    // Chama o método init da classe pai (Model)
    super.init(
      {
        // Colunas da tabela na base de dados, exceto chaves e created/updated_at
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        whatsapp: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        category: Sequelize.STRING,
        price: Sequelize.STRING,
        description: Sequelize.STRING,
        cep: Sequelize.STRING,
        street: Sequelize.STRING,
        //address_number: Sequelize.STRING,
        complement: Sequelize.STRING,
        district: Sequelize.STRING,
        city: Sequelize.STRING,
        uf: Sequelize.STRING,
        status: Sequelize.STRING,
        type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // Hook do Sequelize, beforeSave = antes de criar, editar no bd
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Relacionamento com a tabela de Files
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
