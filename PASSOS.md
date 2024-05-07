# Próximos passos a partir daqui 

## Escala

Mostrar a escala completa no textarea ok
Apensa o autor, doxologia e comunicação visualizam a escala completa, os demais visualizam e editam somente a sua parte correspondente

## Evento

* Poder adicionar evento
* Poder excluir evento
* Poder editar evento

## Calendário

* Poder visualizar de verde os dias com eventos meus
* Poder visualizar de vermelho dias com eventos dos outros
* Poder visualizar de azul dias com os eventos meus e dos outros

# Permissões

## Geral
Só visualiza os dados e as páginas se estiver logado

## Escala

* Contributiva, todos visualizam, mas só editam o que podem

## Evento

* Limite de caracteres para a descrição
* Limite de tamanho para a imagem
* Editar antes do dia do evento chegar (Usar configurações do firestore)
* Excluir com 1 dia de antecedência (Usar configurações do firestore)
* Somente o autor edita o evento (usar um readonly quando o usuário não é autor ou fazer 
    ele visualizar apenas o botão de escala, uma div com o nome do evento, data e hora)

## Calendário

* Bloqueando datas acima de um ano para frente
* Visualizam tudo e editam conforme a categoria eventos
* Após um mês, salvar apenas os dados: nome, descrição, datas, horas e imagem
