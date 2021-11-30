// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'sqlite',
//         filename: env('DATABASE_FILENAME', '.tmp/data.db'),
//       },
//       options: {
//         useNullAsDefault: true,
//       },
//     },
//   },
// });

// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'mysql',
//         host: env('DATABASE_HOST', '127.0.0.1'),
//         port: env.int('DATABASE_PORT', 3306),
//         database: env('DATABASE_NAME', 'lrm_project'),
//         username: env('DATABASE_USERNAME', 'root'),
//         password: env('DATABASE_PASSWORD', 'Utsav@123'),
//         ssl: env.bool('DATABASE_SSL', false),
//       },
//       options: {}
//     },
//   },
// });

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('PG_DATABASE_HOST', '127.0.0.1'),
        port: env.int('PG_DATABASE_PORT', 5432),
        database: env('PG_DATABASE_NAME', 'lrm-project'),
        username: env('PG_DATABASE_USERNAME', 'postgres'),
        password: env('PG_DATABASE_PASSWORD', '0000'), // ssl: { rejectUnauthorized: env.bool('PG_DATABASE_SSL_SELF', false), // For self-signed certificates },
        ssl: { rejectUnauthorized: env.bool('PG_DATABASE_SSL_SELF', false) }, // For self-signed certificates },
      },
      options: {
        ssl: env.bool('PG_DATABASE_SSL', false),
      },
    },
  },
})

// postgres://dlhabovxkrodbq:1169460e6d562baad06eef1a3d02f807c6cd74ca5ba19c982a14d9ef6ec585d2@ec2-54-198-213-75.compute-1.amazonaws.com:5432/d739t8dd0gick3

// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'mongozose',
//       settings: {
//         uri: env('DATABASE_URI'),
//         srv: env.bool('DATABASE_SRV', true),
//         port: env.int('DATABASE_PORT', 27017),
//         database: env('DATABASE_NAME'),
//       },
//       options: {
//         authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
//         ssl: env.bool('DATABASE_SSL', true),
//       },
//     },
//   },
// })