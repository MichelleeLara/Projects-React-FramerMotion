import { useEffect, useState } from 'react'
import Header from './Components/Header'
import { IconX, IconStar } from '@tabler/icons-react'
import { questions } from './Components/constants/questionRate' 
import { motion, px } from 'framer-motion'

function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionsLength = questions.length

  const [hovered, setHovered] = useState(false);

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const handleNext = (data, indexCurrent) => {
    const cardCurrent = document.getElementById(data.id)
    console.log('tamño questions', questionsLength, '  index actual ', indexCurrent);
    cardCurrent.style.zIndex =  questionsLength + 1 - indexCurrent
    cardCurrent.style.transform = `translateY(-10000px)`;
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);


    const initialTransform = 0.9

  };

  const handleBringFront = (id) =>{
    const cards = document.querySelectorAll('.card')
    
    let top = 0
    let scaleCard = 0.9
    // let idCurrent = question.id / 10
    // console.log(cards);
    let zIndexCounter = cards.length;
    let cardInitail = null
    
    cards.forEach((card) =>{
      let indexChange = ''
      // console.log('Dio click la pregunta , ', id, 'y su zindex es de: ',  parseInt(card.style.zIndex));
      
      if (parseInt(card.style.zIndex) === 0) {
        // console.log(card, 'identify')
        cardInitail = card
        // cardInitail.style.zIndex = 100
      }
      const cardId = parseInt(card.id)
      let cardChange = cardId
      let cardCurrent = 0
      if (id === cardId ) {
        cardChange = card.style.zIndex
        card.style.top = 0
        card.style.transform = 'none'
        card.style.zIndex = 0
        cardInitail.style.zIndex = cardChange
        // cardInitail.style.zIndex = cardChange
        // console.log('modified ', cardInitail);
        // if () {
        //   card.style.zIndex = -cardChange
        //   cardCurrent = 0
        //   console.log('card cambi', cardChange, 'cardcurrent',  parseInt(card.style.zIndex, 10));
        // }

      }else{
        
        // zIndexCounter--;
      }
    })

  // // Iterar sobre todas las tarjetas y resetear estilos
  // questions.forEach((question) => {
  //   const card = document.getElementById(question.id);

  //   card.style.background = ''; // Resetear el color de fondo (o cualquier otro estilo que desees)
  //   // Otros estilos que deseas resetear...
  // });

  // // Aplicar estilos a la tarjeta seleccionada
  // const cardSelected = document.getElementById(id);
  // cardSelected.style.background = 'red';
  // // Otros estilos que deseas aplicar...

  // // Restaurar eventos hover después de cierto tiempo (por ejemplo, 1 segundo)
  // setTimeout(() => {
  //   questions.forEach((question) => {
  //     const card = document.getElementById(question.id);
  //     card.style.pointerEvents = 'auto';
  //   });
  // }, 1000);
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
              let idCurrent = question.id / 10
              let cardIndex = 0
              let top = 0

              // const zIndexValue = cards[index] ? parseInt(cards[index].style.zIndex) : null;

              // Verifica que el índice esté dentro del rango de cards
              if (index >= 0 && index < cards.length) {
                const zIndexValue = parseInt(cards[index].style.zIndex);
                

                console.log(zIndexValue < 0 && zIndexValue >= -3);
                if (zIndexValue < 0 && zIndexValue >= -3) {
                  
                  console.log('scale', scaleCard, 'indez', Math.abs(cardIndex / 10), 'operation', scaleCard - Math.abs(cardIndex / 10));
                  scaleCard = scaleCard - Math.abs(cardIndex / 10);
                  cards[index].style.transform = `scale(${scaleCard - Math.abs(zIndexValue / 10)},${scaleCard - Math.abs(zIndexValue / 10)})`;
                  cards[index].style.opacity = scaleCard - Math.abs(zIndexValue / 10);
                }
                
                if (hovered) {
                  if (zIndexValue === 0) {
                    cards[index].style.opacity = 1;
                    top = 0;
                  } else if (zIndexValue === -1) {
                    top = 30;
                  } else if (zIndexValue === -2) {
                    top = 60;
                  }
                }
              }


              // console.log('value', top);
              // cards.forEach((card) =>{
              //   // console.log(parseInt(card.style.zIndex));
              //   cardIndex = parseInt(card.style.zIndex)
              //   if (cardIndex === 0) {
              //     card.style.opacity = 1
              //   }
              //   if (cardIndex <= 3) {
              //     // console.log('scale', scaleCard, 'indez', Math.abs(cardIndex/10), 'operation', scaleCard - Math.abs(cardIndex/10));
              //     // scaleCard = scaleCard - Math.abs(cardIndex/10)
              //     card.style.transform = `scale(${scaleCard - Math.abs(cardIndex/10)},${scaleCard - Math.abs(cardIndex/10)})`
              //     card.style.opacity = scaleCard - Math.abs(cardIndex/10)
              //   }
              //   // console.log('antes de entrar al if', cardIndex, cardIndex === -3);
              //   if (hovered) {
              //     if (cardIndex === 0) {
              //       card.style.top = 0
              //       top = 0
              //     } else if (cardIndex === -1) {
              //       card.style.top = 30
              //       top = 30
              //     } else if (cardIndex === -2) {
              //       card.style.top = 60
              //       top = 610
              //     }
              //   }
              // })
  
 
              // if (question.id <= 3) {
              //   scaleCard = (scaleCard - idCurrent) + 0.2
              // }

                
              // console.log('hover', hovered);

              return (
                <>
                  <motion.section
                    key={question.id}
                    id={question.id}
                    className={`card bg-white rounded-xl shadow-md flex flex-col transition-all duration-300 absolute z-30 h-fit  py-5 px-32 gap-4 items-center translate-x-[rem] border-2 bg-primary-400 origin-[top-center]`}
                    style={{
                      top: -top ,
                      // opacity: scaleCard,
                      transform:`scale(${scaleCard}, ${scaleCard})`,
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
