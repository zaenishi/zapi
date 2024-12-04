const axios = require('axios');
const cheerio = require('cheerio');

async function loads(a) {
  try {
    if (!a) return 'Kata kunci anda salah, gunakan @module/file.js';
    const tobrut = a.split('@')[1].split('/')[0];
    const konbrut = a.split('/')[1];
    if (!tobrut || !konbrut) {
      return 'URL tidak valid, pastikan formatnya benar: @module/file.js';
    }
    const { data } = await axios.get(`https://raw.githubusercontent.com/zaenishi/${tobrut}/refs/heads/main/${konbrut}`);
    if (!data) return { creator: 'zaenishi', message: 'Tidak ada data yang ditemukan' };
    return { creator: 'zaenishi', respon: data };
  } catch (e) {
    const tobrut = a.split('@')[1] ? a.split('@')[1].split('/')[0] : 'Tidak diketahui';
    const konbrut = a.split('/')[1] || 'Tidak diketahui';
    return `Module: ${tobrut}\nFile: ${konbrut} Tidak Ditemukan`;
  }
}

module.exports = { loads }