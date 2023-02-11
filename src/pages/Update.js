import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [shots, setShots] = useState('')
  const [formError, setFormError] = useState(null)
  const [newShots, setNewShots] = useState('0')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newShots) {
      setFormError('Please enter a valid number of shots')
      return
    } else if (newShots < 0) {
      setFormError('Please enter a positive number of shots')
      return
    }

    const { data, error } = await supabase.rpc('add_shots', {user_id: id, new_shots: newShots});
    //console.log({ data })

    // Not adding const together properly so using supabase function
    /*const { data, error } = await supabase
      .from('players')
      .update({ shots })
      .eq('id', id)
      .select()
    */

    if (error) {
      console.log(error)
      setFormError('Error submitting data')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }

  }

  useEffect(() => {
    const fetchPlayer = async() => {
      const { data, error } = await supabase
        .from('players')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', {replace: true})
      }
      if (data) {
        setFirstName(data.first)
        setLastName(data.last)
        setShots(data.shots)
        setNewShots('0')
      }
    }

    fetchPlayer()

  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <h3>Add shots for {first_name} {last_name}</h3>

        <label htmlFor="shots"></label>
        <input 
          type="number"
          id="shots"
          value={ newShots }
          onChange={(e) => setNewShots(e.target.value)}
        />

        <button>Add Shots</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Update