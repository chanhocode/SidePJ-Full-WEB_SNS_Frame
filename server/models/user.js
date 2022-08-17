module.exports = (sequelize, DataTypes) => {
  // comment:: MySQL에 users 테이블 생성 _ (model에서는 대문자 mysql에서는 소문자 복수)
  const User = sequelize.define(
    'User',
    {
      // comment:: id 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // false 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장 설정
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignkey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignkey: 'FollowerId' });
  };
  return User;
};
