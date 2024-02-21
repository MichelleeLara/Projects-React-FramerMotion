import { useEffect, useState } from 'react'
import Header from './Components/Header'
import { IconX, IconStar } from '@tabler/icons-react'
import { questions } from './Components/constants/questionRate' 
import { motion, px } from 'framer-motion'

function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionsLength = questions.length

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const handleNext = (data, indexCurrent) => {
    const cardCurrent = document.getElementById(data.id)
    console.log('tamño questions', questionsLength, '  index actual ', indexCurrent);
    cardCurrent.style.zIndex =  questionsLength + 1 - indexCurrent
    cardCurrent.style.transform = `translateY(-10000px)`;
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);

    const initialTransform = 0.9

  };

  return (
    <>
    {/* <Header/> */}
      <main className='aurora min-h-screen w-full flex justify-center items-center'>
        <section className='flex h-full flex-col items-center justify-end  w-full'>
          <div className="flex relative -top-28 shadow-xl py-2 px-4 rounded-full bg-white">
            {
              questions.map((question, index) => (
                <>
                  <li key={index} className='list-none transition-all  rounded-lg cursor-pointer  py-2.5 px-10  duration-1000 font-medium text-sm hover:bg-gray-300 hover:font-semibold'>{question.id}</li>
                </>
              ))
            }
          </div>
          <div className="relative flex  justify-center items-center bg-red-50  min-w-[440px] min-h-[290px]">
            {questions.map((question, index) => {
              const zIndex = currentQuestionIndex === index ? 0 : 1;
              const scale = currentQuestionIndex === index ? 1.0 : .999;
              const indexCurrent = questions.length - question.id + 2
              let top =25
              let scaleCard = 0.9
              let scaleCalculate = 0
              let idCurrent = question.id / 10
              console.log(question.id > 1 && question.id <= 3);
              if (question.id <= 3) {
                if (question.id === 1) scaleCard = 'none' 
                // top = top * question.id -1
                console.log('antes de operacion', scaleCard, idCurrent);
                scaleCard = (scaleCard - idCurrent) + 0.2
                // console.log('scala: ', scaleCalculate, ' id: ', question.id)
                console.log('despues ', scaleCard);
                // return scaleCalculate
              } else{
                top = 0
                scaleCard = 'none'
                scaleCalculate = 0
              }

              if (question.id === 1) {
                top = 0;
              } else if (question.id === 2) {
                top = 30;
              } else if (question.id === 3) {
                top = 60;
              }
                

              return (
                <>
                  <motion.section
                    key={question.id}
                    id={question.id}
                    className={`bg-white rounded-xl shadow-md flex flex-col transition-all duration-700 absolute z-30 h-fit  py-5 px-32 gap-4 items-center translate-x-[rem] border-2 bg-primary-400 origin-[top-center]`}
                    style={{
                      top: question.id === 1 ? 0 : -top ,
                      transform: question.id === 1 ? 'none': `scale(${scaleCard}, ${scaleCard})`,
                      zIndex: questions.length - question.id + 20,
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
