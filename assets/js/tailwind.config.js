module.exports = { //right button carrossels 
    theme: {
      extend: {
        spacing: {
          '180px': '180px', // Pour `top` sur grands écrans
          '316px': '316px', // Pour `left` sur grands écrans
          '150px': '150px', // Pour `top` sur écrans moyens
          '250px': '250px', // Pour `left` sur écrans moyens
          '100px': '100px', // Pour `top` sur petits écrans
          '200px': '200px', // Pour `left` sur petits écrans
        },
      },
    },
    plugins: [],
  }

module.exports = {  //ajout de right button carroussels
  theme: {
    extend: {
      spacing: {
        'top-sm': '100px', // pour petits écrans
        'top-md': '150px', // pour écrans moyens
        'top-lg': '180px', // pour grands écrans
      },
    },
  },
  plugins: [],
}
