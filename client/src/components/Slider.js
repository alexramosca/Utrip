import {useState, useEffect} from 'react'
export const Slider = ()=>{
    const images = [
        { name: 'Toronto', src: './images/toronto.jpg' },
        { name: 'Vancouver', src: './images/vancouver.jpg' },
        { name: 'Fredericton', src: './images/fredericton.jpg' },
        { name: 'Halifax', src: './images/halifax.jpg' }
      ];
    const [currentImg, setCurrentImg] = useState(0)

    const handleNext = (current, array)=>{
        if(current === array.length-1){
            return setCurrentImg(0)

        }
        let next = current + 1
        setCurrentImg(next)
    }

    const handlePrevious = (current, array)=>{
        if(current === 0){
            return setCurrentImg(array.length-1)

        }
        let next = current - 1
        setCurrentImg(next)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNext(currentImg, images);
        }, 6000);
    
        return () => clearInterval(intervalId);
    }, [currentImg, images]);
    return(
        <div  className='sliderWrapper'>
            <img onClick={()=> handlePrevious(currentImg, images)} src='./icons/arrow-left.svg' />
            <div className='imgWrapper'>
                <img src={images[currentImg].src} loading='lazy' />
                <h2 id='cityName'>{images[currentImg].name}</h2>
                    
                
            </div>
            <img onClick={()=> handleNext(currentImg, images)} src='./icons/arrow-right.svg' />
        </div>
     
    )
}