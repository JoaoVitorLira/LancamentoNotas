// Função para exibir/ocultar o dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Fecha o dropdown ao clicar fora dele
window.onclick = function (event) {
  if (!event.target.matches('.custom-input')) {
    const dropdown = document.getElementById("dropdown");
    if (dropdown && dropdown.style.display === "block") {
      dropdown.style.display = "none";
    }
  }
};

// Ajusta a altura do container da tabela
function adjustTableContainerHeight() {
  const dropdown = document.getElementById("dropdown");
  if (dropdown) {
    dropdown.style.maxHeight = '100px';
    dropdown.style.overflowY = 'auto';
  }
}

adjustTableContainerHeight();
window.addEventListener('resize', adjustTableContainerHeight);

// Função para calcular a média
function calcularMedia(notas) {
  const soma = notas.reduce((acc, nota) => acc + parseFloat(nota || 0), 0);
  return (soma / notas.length).toFixed(2);
}

// Função para atualizar a média ao preencher as notas
function atualizarMedia() {
  // Seleciona todas as divs de alunos
  const alunos = document.querySelectorAll('[id^="alunoNota"]');

  alunos.forEach((aluno) => {
    // Seleciona os inputs de nota e a div da média para cada aluno
    const inputNota1 = aluno.querySelector('#campo1');
    const inputNota2 = aluno.querySelector('#campo2');
    const inputNota3 = aluno.querySelector('#campo3');
    const inputsNotas = [inputNota1, inputNota2, inputNota3];
    const mediaDiv = aluno.querySelector('.media p');

    // Adiciona um listener a cada input para recalcular a média quando mudar
    inputsNotas.forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const notas = inputsNotas.map(input => input.value);

          // Verifica se todas as 3 notas foram preenchidas
          if (notas.every(nota => nota !== '')) {
            const media = calcularMedia(notas);
            mediaDiv.textContent = media;
          }
        });
      }
    });
  });
}

// Chama a função para atualizar as médias assim que o DOM estiver carregado
document.addEventListener('DOMContentLoaded', atualizarMedia);
