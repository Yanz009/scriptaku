/*  

  Made By yanz
  Base : yanz
  WhatsApp : wa.me/6283829814737
  Telegram : t.me/yanzkren01
  Youtube : @yanzkren01

  Channel : 

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

// Import Module
require('./len')
require('./database/Menu/LenwyMenu')
const fs = require('fs');
const axios = require('axios');

// Import Scrape
const Ai4Chat = require('./scrape/Ai4Chat');
const tiktok2 = require('./scrape/Tiktok');

module.exports = async (yanz, m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const sender = msg.key.remoteJid;
    const pushname = msg.pushName || "yanz";
    const args = body.slice(1).trim().split(" ");
    const command = args.shift().toLowerCase();
    const q = args.join(" ");

    if (!body.startsWith(prefix)) return;

    const lenwyreply = (teks) => yanz.sendMessage(sender, { text: teks }, { quoted: msg });
    const isGroup = sender.endsWith('@g.us');
    const isAdmin = (admin.includes(sender))
    const menuImage = fs.readFileSync(image);

switch (command) {

// Menu
case "menu": {
    await yanz.sendMessage(sender,
        {
            image: menuImage,
            caption: yanzmenu,
            mentions: [sender]
        },
    { quoted: msg }
    )
}
break

// Hanya Admin
case "admin": {
    if (!isAdmin) return yanzyreply(mess.admin); // COntoh Penerapan Hanya Admin
    yanzyreply("🎁 *Kamu Adalah Admin*"); // Admin Akan Menerima Pesan Ini
}
break

// Hanya Group
case "group": {
    if (!isGroup) return yanzeply(mess.group); // Contoh Penerapan Hanya Group
    yanzreply("🎁 *Kamu Sedang Berada Di Dalam Grup*"); // Pesan Ini Hanya Akan Dikirim Jika Di Dalam Grup
}
break

// AI Chat
case "ai": {
    if (!q) return yanzyreply("☘️ *Contoh:* !ai Apa itu JavaScript?");
        yanzreply(mess.wait);
    try {
        const lenai = await Ai4Chat(q);
            await yanzreply(`*yanz AI*\n\n${lenai}`);
                } catch (error) {
            console.error("Error:", error);
        yanzreply(mess.error);
    }
}
break;

case "ttdl": {
    if (!q) return yanzreply("⚠ *Mana Link Tiktoknya?*");
        lenwyreply(mess.wait);
    try {
        const result = await tiktok2(q); // Panggil Fungsi Scraper

            // Kirim Video
            await lenwy.sendMessage(
                sender,
                    {
                        video: { url: result.no_watermark },
                        caption: `*🎁yanz Tiktok Downloader*`
                    },
                { quoted: msg }
            );

        } catch (error) {
            console.error("Error TikTok DL:", error);
        lenwyreply(mess.error);
    }
}
break;

case "igdl": {
    if (!q) return lenwyreply("⚠ *Mana Link Instagramnya?*");
    try {
        lenwyreply(mess.wait);

        // Panggil API Velyn
        const apiUrl = `https://www.velyn.biz.id/api/downloader/instagram?url=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.status || !response.data.data.url[0]) {
            throw new Error("Link tidak valid atau API error");
        }

        const data = response.data.data;
        const mediaUrl = data.url[0];
        const metadata = data.metadata;

        // Kirim Media
        if (metadata.isVideo) {
            await yanz.sendMessage(
                sender,
                    {
                        video: { url: mediaUrl },
                        caption: `*Instagram Reel*\n\n` +
                            `*Username :* ${metadata.username}\n` +
                            `*Likes :* ${metadata.like.toLocaleString()}\n` +
                            `*Comments :* ${metadata.comment.toLocaleString()}\n\n` +
                            `*Caption :* ${metadata.caption || '-'}\n\n` +
                            `*Source :* ${q}`
                    },
                    { quoted: msg }
                );
        } else {
            await yanz.sendMessage(
                sender,
                    {
                        image: { url: mediaUrl },
                        caption: `*Instagram Post*\n\n` +
                            `*Username :* ${metadata.username}\n` +
                            `*Likes :* ${metadata.like.toLocaleString()}\n\n` +
                            `*Caption :* ${metadata.caption || '-'}`
                    },
                    { quoted: msg }
                );
            }

        } catch (error) {
            console.error("Error Instagram DL:", error);
        lenwyreply(mess.error);
    }
}
break;

// Game Tebak Angka
case "tebakangka": {
    const target = Math.floor(Math.random() * 100);
        lenwy.tebakGame = { target, sender };
    lenwyreply("*Tebak Angka 1 - 100*\n*Ketik !tebak [Angka]*");
}
break;

case "tebak": {
    if (!lenwy.tebakGame || yanz.tebakGame.sender !== sender) return;
        const guess = parseInt(args[0]);
    if (isNaN(guess)) return yanzreply("❌ *Masukkan Angka!*");

    if (guess === yanz.tebakGame.target) {
        lenwyreply(`🎉 *Tebakkan Kamu Benar!*`);
            delete yanz.tebakGame;
        } else {
            lenwyreply(guess > yanz.tebakGame.target ? "*Terlalu Tinggi!*" : "*Terlalu rendah!*");
    }
}
break;

case "quote": {
    const quotes = [
        "Jangan menyerah, hari buruk akan berlalu.",
        "Kesempatan tidak datang dua kali.",
        "Kamu lebih kuat dari yang kamu kira.",
        "Hidup ini singkat, jangan sia-siakan."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    lenwyreply(`*Quote Hari Ini :*\n_"${randomQuote}"_`);
}
break;

        default: { lenwyreply(mess.default) }
    }
  }
