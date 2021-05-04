// Comandos do sequelize:
// yarn sequelize
// migration:create --name=create-users -> Criar
// db:migrate -> Rodar
// db:migrate:undo -> Desfazer
// db:migrate:undo:all -> Desfazer todas

module.exports = {
  // Quando a migration for executada
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      whatsapp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // A senha será criptografada, o que será salvo será apenas um hashing
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // O usuário poderá ser prestador (true) ou cliente (false)
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Por padrão todos usuários serão clientes
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  // Rollback
  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
