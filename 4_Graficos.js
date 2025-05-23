/meu-projeto/
├── index.html
├── dados.json



{
  "labels": [5, 7, 9, 11, 12, 13, 14],
  "modelos": [
    {
      "label": "Modelo 1",
      "data": [5, 7, 8, 9, 10, 11, 12],
      "borderColor": "rgb(255, 99, 132)",
      "backgroundColor": "rgba(255, 99, 132, 0.2)"
    },
    {
      "label": "Modelo 2",
      "data": [5, 7, 10, 11, 12, 13, 14],
      "borderColor": "rgb(54, 162, 235)",
      "backgroundColor": "rgba(54, 162, 235, 0.2)"
    },
    {
      "label": "Modelo 3",
      "data": [5, 7, 8, 9, 10, 11, 13],
      "borderColor": "rgb(75, 192, 192)",
      "backgroundColor": "rgba(155, 99, 132, 0.2)",
      "tension": 0.4
    },
    {
      "label": "MOdelo 4",
      "data": [5, 5.5, 6, 7, 8, 9, 10],
      "borderColor": "rgb(255, 159, 64)",
      "backgroundColor": "rgba(255, 159, 64, 0.2)",
      "tension": 0.4
    },
    {
      "label": "Modelo 5",
      "data": [5, 6, 7, 8, 9, 10, 11],
      "borderColor": "rgb(0, 0, 0)",
      "backgroundColor": "rgba(30, 99, 132, 0.2)",
      "tension": 0.4
    }
  ]
}




<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Media de tempo de vida (em anos)</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <canvas id="myChart" width="600" height="400"></canvas>
    <script>
        
        fetch('dados.json')
            .then(response => response.json())
            .then(json => {
                const config = {
                    type: 'line',
                    data: {
                        labels: json.labels,
                        datasets: json.datasets
                    },
                    options: {
                        responsive: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Chart.js Line Chart' }
                        }
                    }
                };

                const ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, config);
            })
            .catch(error => {
                console.error('Erro ao carregar o JSON:', error);
            });
    </script>
</body>
</html>


//grafico de barra


meu-projeto/
├── index.html
└── dados.json

{
    "labels": ["Modelo 1", "Modelo 2", "Modelo 3", "Modelo 4", "Modelo 5"],
    "data": [12, 10, 5, 3, 18]
}



<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Média de tempo de vida (em anos)</title>
  <style>
    canvas { border: 1px solid #050404; display: block; margin: 20px auto; }
    body { text-align: center; font-family: sans-serif; }
  </style>
</head>
<body>
  <h1>Gráfico de Barras</h1>
  <canvas id="grafico" width="500" height="300"></canvas>

  <script>
fetch('dados.json')
  .then(response => response.json())
  .then(json => {
    const dados = Array.isArray(json.data) ? json.data.filter(item => typeof item === 'number') : [];
    const rotulos = Array.isArray(json.labels) ? json.labels : dados.map((_, i) => `Item ${i + 1}`);

    const canvas = document.getElementById('grafico');
    const ctx = canvas.getContext('2d');

    const alturaBarra = 40;
    const espacamento = 30;
    const larguraMax = Math.max(...dados);

    dados.forEach((valor, i) => {
      const largura = (valor / larguraMax) * (canvas.width - 100);
      const y = i * (alturaBarra + espacamento) + 30;
      const x = 80;

      ctx.fillStyle = '#3498db';
      ctx.fillRect(x, y, largura, alturaBarra);

      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(rotulos[i] || `Item ${i + 1}`, x - 10, y + alturaBarra / 2);
    });
  })
  .catch(erro => {
    console.error('Erro ao carregar os dados:', erro);
  });
</script>
</script>
</body>
</html>

//grafico linha horizontal

/meu-projeto/
├── index.html
└── dados.json

{
    "labels": ["Modelo 1", "Modelo 2", "Modelo 3", "Modelo 4", "Modelo 5"],
    "data": [12, 10, 5, 3, 18]
}

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Grafico de Coluna</title>
  <style>
    canvas { border: 1px solid #050404; display: block; margin: 20px auto; }
    body { text-align: center; font-family: sans-serif; }
  </style>
</head>
<body>
  <h1>Media de tempo de vida (em anos)</h1>
  <canvas id="grafico" width="500" height="300"></canvas>

  <script>
fetch('dados.json')
  .then(response => response.json())
  .then(json => {
    const dados = Array.isArray(json.data) ? json.data.filter(item => typeof item === 'number') : [];
    const rotulos = Array.isArray(json.labels) ? json.labels : dados.map((_, i) => `Item ${i + 1}`);

    const canvas = document.getElementById('grafico');
    const ctx = canvas.getContext('2d');

    const larguraBarra = 60;
    const espacamento = 40;
    const alturaMax = Math.max(...dados);

    dados.forEach((valor, i) => {
      const altura = (valor / alturaMax) * (canvas.height - 20);
      const x = i * (larguraBarra + espacamento) + 50;
      const y = canvas.height - altura;

      ctx.fillStyle = '#3498db';
      ctx.fillRect(x, y, larguraBarra, altura);

      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(rotulos[i] || `Item ${i + 1}`, x + larguraBarra / 2, canvas.height - 5);
    });
  })
  .catch(erro => {
    console.error('Erro ao carregar os dados:', erro);
  });
</script>
</body>
</html>

//grafico coluna


/meu-projeto/
├── index.html
└── dados.json

{
    "labels": ["Modelo 1", "Modelo 2", "Modelo 3", "Modelo 4", "Modelo 5"],
    "data": [12, 10, 5, 3, 18]
}


<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Grafico pizza</title>
  <style>
    canvas {
      border: 3px solid #050404;
      display: block;
      margin: 20px auto;
      background-color: whitesmoke;
    }
  </style>
</head>
<body>
  <h1 style="text-align: center;">Media de tempo de vida (em anos)</h1>
  <canvas id="grafico" width="500" height="500"></canvas>

<script>
fetch('dados.json')
  .then(response => response.json())
  .then(json => {
    const dados = json.data; // Carrega os dados do JSON
    const rotulos = ["Modelo 1", "Modelo 2", "Modelo 3", "Modelo 4", "Modelo 5"];
    const total = dados.reduce((soma, val) => soma + val, 0);
    const cores = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];

    const canvas = document.getElementById('grafico');
    const ctx = canvas.getContext('2d');

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const raio = 150;

    let anguloInicial = 0;

    dados.forEach((valor, i) => {
      const fracao = valor / total;
      const anguloFinal = anguloInicial + fracao * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, raio, anguloInicial, anguloFinal);
      ctx.closePath();
      ctx.fillStyle = cores[i % cores.length];
      ctx.fill();

      const anguloMeio = (anguloInicial + anguloFinal) / 2;
      const rx = cx + Math.cos(anguloMeio) * (raio + 30);
      const ry = cy + Math.sin(anguloMeio) * (raio + 30);

      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = rx < cx ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(rotulos[i] || `Item ${i + 1}`, rx, ry);

      anguloInicial = anguloFinal;
    });
  })
  .catch(error => {
    console.error('Erro ao carregar dados.json:', error);
  });
</script>
</body>
</html>

//grafico pizza
