import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'

import PlayerCard from "../components/PlayerCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [players, setPlayers] = useState(null)
  const [orderBy, setOrderBy] = useState('shots')

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
      .from('players')
      .select()
      .order(orderBy, {ascending: (orderBy == 'shots' ? false : true)})

      if (error) {
        setFetchError('Could not fetch player database')
        setPlayers(null)
        console.log(error)
      }
      if (data) {
        setPlayers(data)
        setFetchError(null)
      }
    }

    fetchPlayers()

  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {players && (
        <div className="players">
          <div className="order-by">
            <p>Order By:</p>
            <button onClick={() => setOrderBy('number')}>Number</button>
            <button onClick={() => setOrderBy('last')}>Last Name</button>
            <button onClick={() => setOrderBy('shots')}>Shots</button>
            <div className="player-list">
              {players.map(player => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home