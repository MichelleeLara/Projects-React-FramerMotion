import { useEffect, useState } from 'react'
import Header from './Components/Header'
import { IconX, IconStar } from '@tabler/icons-react'
import { questions } from './Components/constants/questionRate' 
import { motion, px } from 'framer-motion'

function App() {

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionsLength = questions.length

  const [hovered, setHovered] = useState(false);
  const handleNext = (data, indexCurrent) => {
    const cardCurrent = document.getElementById(data.id)
    console.log('tamño questions', questionsLength, '  index actual ', indexCurrent);
    cardCurrent.style.zIndex =  questionsLength + 1 - indexCurrent
    cardCurrent.style.transform = `translateY(-10000px)`;
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleBringFront = (id) => {
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
        console.log('No se encontraron tarjetas para intercambiar.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {/* <Header/> */}
      <main className='aurora min-h-screen w-full flex justify-center items-center absolute -z-50'>
        <section className='flex h-full flex-col items-center justify-end  w-full'>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}  className="flex relative -top-28 shadow-xl py-2 px-4 rounded-full bg-white">
            {
              questions.map((question, index) => (
                <>
                  <li onClick={ (() =>{ handleBringFront(question.id) })} className='list-none transition-all  rounded-lg cursor-pointer  py-2.5 px-10  duration-1000 font-medium text-sm hover:bg-gray-300 hover:font-semibold'>{question.id}</li>
                </>
              ))
            }
          </div>
          <div className="relative flex  justify-center items-center min-w-[440px] min-h-[290px]">
            {questions.map((question, index) => {
              const cards = document.querySelectorAll('.card')
              const indexCurrent = questions.length - question.id + 2
              let scaleCard = 0.9
              let cardIndex = 0
              let top = 0
              let zIndexValue = 0

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
                    className={`card bg-white rounded-xl shadow-md flex flex-col transition-all duration-300 absolute z-30 h-fit  py-5 px-32 gap-4 items-center translate-x-[rem] border-2 bg-primary-400 origin-[top-center]`}
                    style={{
                      top: -top ,
                      opacity: scaleCard-index / 10 + 0.1,
                      transform:`scale(${scaleCard - index/10 + 0.1}, ${scaleCard - index/10 + 0.1})`,
                      zIndex: -(question.id - 1) ,
                    }}
                  >
                    <IconX
                      size={20}
                      className='text-[#666666] absolute top-4 right-4 cursor-pointer rounded-2xl p-1 transition-all hover:bg-[#666666] hover:text-white'
                    />
                    <p className='text-lg font-semibold'>Calificanos !</p>
                    <p className='text-base'>{question.question}</p>
                    <div className='flex gap-4 '>
                      <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' />
                      <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' />
                      <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' />
                      <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' />
                      <IconStar className='fill-[#057fff] text-[#057fff] cursor-pointer' />
                    </div>
                    <p className='text-sm text-[#666666] font-semibold'>info choose render</p>
                    <button onClick={() =>{handleNext(question, indexCurrent)}} className='bg-[#057fff] py-1.5 px-10 w-fit rounded-lg text-white mt-7 mb-6'>
                      Siguiente
                    </button>
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
