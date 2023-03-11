import { connect } from 'mongoose';
import config from 'config';

export default function () {
  const db = config.get('db');
  connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`Connected to ${db}...`));
}
