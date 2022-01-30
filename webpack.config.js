import Hwp from 'html-webpack-plugin';

export default {
  mode: process.env.NODE_ENV,
  plugins: [
    new Hwp({
      template: 'index.html',
    }),
  ],
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
