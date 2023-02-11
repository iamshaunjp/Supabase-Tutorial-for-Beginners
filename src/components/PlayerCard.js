import { Link } from 'react-router-dom'

const PlayerCard = ({ player }) => {
    return (
        <div className="player-card">
            <img className='avatar' src={player.avatar} alt="" />
            <h3 className='name'>{player.first} {player.last}</h3>
            <p className='number'>#{player.number}</p>
            <div className="shots">
                <Link to={'/' + player.id}>
                    {player.shots}
                </Link>
            </div>
        </div>
    )
}

export default PlayerCard