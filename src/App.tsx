// JSX: Javascript + XML
import { GameController, MagnifyingGlassPlus } from 'phosphor-react'
import './styles/main.css';
import logoImg from './assets/Logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  

  useEffect(() =>{
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
      {games.map(games => {
        return (
          <GameBanner
          key={games.id} 
          bannerUrl={games.bannerUrl} 
          title={games.title} 
          adsCount={games._count.ads} 
          />
        )
      }
        )}

       


      </div>
      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
        <Dialog.Overlay className="bg-black/68 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadown-black/25">
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
            <Dialog.Content>
              <form className='mt-8'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                  <input id="game" type="text" placeholder="Selecione o game que deseja jogar" className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' />
                </div>

                <div>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <input id="name" type="text" placeholder="Como te chamam dentro do game?" />
                  </div>
                  <div>
                    <div>
                      <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                      <input id="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO' />

                    </div>
                    <div>
                      <label htmlFor='Discord'>Qual é o seu discord?</label>
                      <input id="discord" type="text" placeholder='Usuário#0000' />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor='weekdays'>Quando costuma jogar?</label>
                    </div>
                    <div>
                      <label htmlFor='HourStart'>Qual horário do dia?</label>
                      <div>
                        <input id="hourStart" type="time" placeholder='De' />
                        <input id="hourEnd" type="time" placeholder='até' />
                      </div>
                    </div>
                  </div>
                  <div>
                    <input type= "checkbox" />
                    Costumo me conectar no chat de voz
                  </div>
                  <footer>
                    <button>Cancelar</button>
                    <button type="submit">
                      <GameController />
                      Encontrar duo</button>
                  </footer>
              </form>
            </Dialog.Content>
          </Dialog.Content>

        </Dialog.Portal>
        </Dialog.Root>
    </div>

  )
}

export default App
