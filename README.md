# airfluencers-python-logger
Biblioteca de log que segue as normas definidas pela airfluencers

## Requisitos:
- NodeJS
- jasmine
- logger

## Objetivo:
- Todo log para stdout segue o formato json
- Classe tem método para todos os levels, que são adicionados no json na chave level
- Todo log tem o campo @timestamp no formato:  yyyy-MM-dd'T'HH:mm:ss
- Todo @timestamp usa o timezone de SP
- Primeiro argumento gera campo message
- Segundo argumento deve ser um dict com outros campos que vão dar merge no json
- Primeira key do log gerado deve ser @timestamp, segunda level, terceira message.

## Running Tests:
Activate the virtualenv and:
```bash
nosetests
```