const canvas = document.querySelector('.js-canvas')
const replayBtn = document.querySelector('.js-replay-btn')

document.querySelector('#box').addEventListener('click', () => {
	if (canvas.classList.contains('anim-step-1')) {
		return
	}
	canvas.classList.add('anim-step-1')
})

document.querySelector('#tree').addEventListener('click', () => {
	if (canvas.classList.contains('anim-step-2')) {
		return
	}
	canvas.classList.add('anim-step-2')

	setTimeout(() => {
		canvas.classList.add('anim-step-3')
		replayBtn.classList.remove('hide')
	}, 1000)
})

document.querySelector('.js-replay-btn').addEventListener('click', () => {
	canvas.classList.remove('anim-step-1')
	canvas.classList.remove('anim-step-2')
	canvas.classList.remove('anim-step-3')
	replayBtn.classList.add('hide')
})