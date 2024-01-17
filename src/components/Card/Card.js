import React from 'react'
import './Card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = (props) => {
    const { card } = props
    // console.log('card', card)


    return (
        <>
            <div className='card-item'>
                {card.image &&
                    <img
                        className='card-cover'
                        src={card.image} alt=''
                        onMouseDown={event => event.preventDefault()}
                    />
                }
                {card.title}
                <div className='trash-icon'>
                    <FontAwesomeIcon
                        icon="fa-solid fa-trash"
                    />
                </div>
            </div>

        </>
    )
}

export default Card