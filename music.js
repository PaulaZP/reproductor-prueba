const song1 = 'https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/rad001';

async function prueba(song1){
  const resultado = await fetch(song1)
  .then((response) => response.json())
  .then((data) =>  data);
    return resultado;
}

export{song1, prueba} ;
