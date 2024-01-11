export const useLockBody = (state)=>{
    const body = document.querySelector('body')
        state === 'open'? body.classList.add('lock'):body.classList.remove('lock')
    
}