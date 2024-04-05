
let participantes = [
  {
    nome: "Jorge A S Figueiredo",
    email: "jorge@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 17),
    dataCheckIn: null
  },
  {
    nome: "Déborah Alves",
    email: "deborah@gmail.com",
    dataInscricao: new Date(2024, 2, 11, 18),
    dataCheckIn: new Date(2024, 3, 1, 10)
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 10),
    dataCheckIn: new Date(2024, 3, 10, 9)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 8, 14),
    dataCheckIn: new Date(2024, 3, 2, 12)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 9),
    dataCheckIn: new Date(2024, 3, 9, 11)
  },
  {
    nome: "Ricardo Pereira",
    email: "ricardo@gmail.com",
    dataInscricao: new Date(2024, 2, 2, 20),
    dataCheckIn: new Date(2024, 3, 2, 14)
  },
  {
    nome: "Carla Costa",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 12),
    dataCheckIn: new Date(2024, 3, 2, 8)
  },
  {
    nome: "João Rodrigues",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 1, 25, 8),
    dataCheckIn: new Date(2024, 3, 3, 16)
  },
  {
    nome: "Marta Sousa",
    email: "marta@gmail.com",
    dataInscricao: new Date(2024, 1, 22, 22),
    dataCheckIn: new Date(2024, 3, 1, 13)
  },
  {
    nome: "Tiago Fernandes",
    email: "tiago@gmail.com",
    dataInscricao: new Date(2024, 1, 20, 16),
    dataCheckIn: new Date(2024, 3, 4, 9)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscriçao = dayjs(Date.now())
  .to(participante.dataInscriçao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  //estrutura condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email='${participante.email}'
      onclick="fazerCheckIn(event)"
    >
     Confirmar check-in
     </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
         ${participante.email}
        </small>
        </td>
      <td>${dataInscriçao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
//estrutura de repetiçao - loop
let output = ""
for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)
}

document
.querySelector('tbody')
.innerHTML = output  
}//arrow function - pegar informaçao html e substituir informaçao html
atualizarLista(participantes)


const adicionarParticipante = (event) => {
  event.preventDefault()  
  
  const dadosDoFormulario = new FormData(event.target)
 
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscriçao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já está ou não inscrito
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
   //confirmar se realmente quer fazer o check-in
   const mensagemConfirmacao = 'Deseja prosseguir com o check-in?'
   if(confirm(mensagemConfirmacao) == false) {
     return
   }

  //encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email 
  })
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista de participantes
  atualizarLista(participantes)
}





