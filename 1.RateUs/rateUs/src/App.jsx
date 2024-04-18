import {  useEffect, useState } from 'react'
import { IconStar } from '@tabler/icons-react'
import { questions } from './Components/constants/questionRate' 
import { motion, px } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function App() {

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const questionsLength = questions.length

  const [hovered, setHovered] = useState(false);
  const [currentNav, setCurrentNav] = useState("0")
  const [rating, setRating] = useState("0")
  const [cardRating, setCardRating] = useState({})
  const history = useNavigate()
  // const rated = false
  // const handleNext = (data, indexCurrent) => {
  //   const cardCurrent = document.getElementById(data.id)
  //   console.log('tamño questions', questionsLength, '  index actual ', indexCurrent);
  //   cardCurrent.style.zIndex =  questionsLength + 1 - indexCurrent
  //   cardCurrent.style.transform = `translateY(-10000px)`;
  //   // setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  // };

  const handleBringFront = (id, index) => {
    setCurrentNav(index)
    const cards = document.querySelectorAll('.card');
    
    let cardInitail = null;
    let cardForChange = null;
    
    cards.forEach((card) => {
      if (parseInt(card.style.zIndex) === 0) {
        cardInitail = card;
      }
      
      const cardId = parseInt(card.id);
  
      if (id === cardId) {
        cardForChange = card;
      }
    });
  
    try {
      if (cardInitail && cardForChange) {
        if (parseInt(cardForChange.id) > 3 ) {
          // console.log('catrtda entro', cardForChange);
        }
        // console.log(parseInt(cardForChange).id);
        const scaleCardInitial = cardInitail.style.transform;
        const topCardInitial = cardInitail.style.top;
        const opacityCardInitial = cardInitail.style.opacity;
        const zIndexCardInitial = cardInitail.style.zIndex;
  
        const scaleCardChange = cardForChange.style.transform;
        const topCardChange = cardForChange.style.top;
        const opacityCardChange = cardForChange.style.opacity;
        const zIndexCardChange = cardForChange.style.zIndex;
  
        cardForChange.style.transform = scaleCardInitial;
        cardForChange.style.top = topCardInitial;
        cardForChange.style.opacity = opacityCardInitial;
        cardForChange.style.zIndex = zIndexCardInitial;
  
        cardInitail.style.transform = scaleCardChange;
        cardInitail.style.top = topCardChange;
        cardInitail.style.opacity = opacityCardChange;
        cardInitail.style.zIndex = zIndexCardChange;
      } else {
        // console.log('No se encontraron tarjetas para intercambiar.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log('etsado.', cardRating);

  const isComplete = () =>{
    return Object.keys(cardRating).length === 5;
  }

  useEffect(() => {
    if (isComplete()) {
      return history('/thanks');

    }
  }) 

  const handleRating = (cardId,value) => {
    setCardRating((prevRating) => ({
      ...prevRating,
      [cardId]:{
        value,
        rated: true
      }
    }))
    // console.log('idx', value);
    // setRating(value);
  }

  return (
    <>
    {/* <Header/> */}
      <main className='aurora min-h-screen w-full flex justify-center items-center absolute -z-50'>
        <section className='flex h-full flex-col items-center justify-end  w-full'>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}  className="flex relative -top-28 shadow-xl gap-4 py-1 px-4 rounded-full bg-white">
            {
              questions.map((question, index) => {
                const isRated = cardRating[question.id] || {}
                const { value = 0 , rated = false } = isRated
                console.log('isRateeeeeeeeeeeed', isRated);
                return(
                  <>
                    <li onClick={ (() =>{ handleBringFront(question.id, index) })} className={`${currentNav == index ? 'bg-gray-300' : ''} ${rated && 'bg-green-300'} list-none transition-all  rounded-lg cursor-pointer  py-1.5 px-6  duration-500 font-medium text-sm hover:bg-gray-300 hover:font-semibold`}>{question.id}</li>
                  </>
                )
              })
            }
          </div>
          <div className="relative flex  justify-center items-center min-w-[440px] min-h-[290px]">
            {questions.map((question, index) => {

              const cardRatingg = cardRating[question.id] || {};
              // console.log('esto es cardRaingg' ,  cardRatingg);
              const { value = 0 , rated = false} = cardRatingg

              const cards = document.querySelectorAll('.card')
              const indexCurrent = questions.length - question.id + 2
              let scaleCard = 0.9
              let cardIndex = 0
              let top = 0
              let zIndexValue = 0


              // console.log('rated', rated);

              if (index >= 0 && index < cards.length) {
                zIndexValue = parseInt(cards[index].style.zIndex);

                
                if (hovered) {
                  if (zIndexValue < 0 && zIndexValue >= -5) {
 
                    scaleCard = scaleCard - Math.abs(cardIndex / 10);
                    cards[index].style.transform = `scale(${scaleCard - Math.abs(zIndexValue / 10) + 0.1},${scaleCard - Math.abs(zIndexValue / 10) + 0.1})`;
                    // cards[index].style.opacity = scaleCard - Math.abs(zIndexValue / 10);
                  }
                  if (zIndexValue === 0) {
                    // cards[index].style.opacity = 1;
                    top = 0;
                  } else if (zIndexValue === -1) {
                    top = 30;
                  } else if (zIndexValue === -2) {
                    top = 60;
                  } else if (zIndexValue === -3){
                    top = 90;
                    // indez =index * 2
                  }else if (zIndexValue === -4){
                    top = 120;
                    // indez =index * 2
                  }
                } else{
                  // console.log('salio del hover');
                  cards[index].style.top = 0
                }
              }
              return (
                <>
                  <motion.section
                    key={question.id}
                    id={question.id}
                    className={`card bg-white max-h-[275px] rounded-xl shadow-md flex flex-col transition-all duration-300 absolute z-30 h-fit  py-12 px-32 gap-5 text-center items-center translate-x-[rem] border-2 bg-primary-400 origin-[top-center]`}
                    style={{
                      top: -top ,
                      opacity: scaleCard-index / 10 + 0.1,
                      transform:`scale(${scaleCard - index/10 + 0.1}, ${scaleCard - index/10 + 0.1})`,
                      zIndex: -(question.id - 1) ,
                    }}
                  >
                    <div className=" rounded-full bg-[#057fff]">
                      <p className='p-3 px-5 text-white font-semibold'>{index + 1}</p>
                    </div>
                    <p className='font-semibold text-base'>{question.question}</p>
                    <div className='flex gap-4 flex-col'>
                      <div className="flex">
                        {
                          Array.from({ length: 5 }, (_,idx) => {
                            

                            return(
                              <>
                                <IconStar key={idx} className={`${idx < value ? 'fill-[#057fff] text-[#057fff]' : 'fill-[#ccc] text-[#ccc]'} cursor-pointer`} onClick={() =>{handleRating(question.id, idx + 1)}} />
                              </>
                            )
                            
                          })
                        }
                      </div>
                      <div className="">
                        {
                          rated && (
                            <span className='text-sm text-[#666666] font-semibold'>Gracias por calificar!</span>
                          )
                        }
                      </div>
                      {/* <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' />
                      <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' />
                      <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' />
                      <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' /> */}
                    </div>
                  </motion.section>
                
                </>
              );
            })}
          </div>
        </section>
        
      </main>
    </>
  )
}

export default App
