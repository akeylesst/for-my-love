let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()
    startHearts()

    const music = document.getElementById('bg-music')
    music.volume = 0.4
    
    // Attempt play - usually works since it's a cross-page navigation from a click
    music.play().then(() => {
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }).catch(() => {
        // Fallback for strict browsers
        document.addEventListener('click', () => {
            if (!musicPlaying) {
                music.play()
                musicPlaying = true
                document.getElementById('music-toggle').textContent = '🔊'
            }
        }, { once: true })
    })
})

function startHearts() {
    const heartsBg = document.getElementById('hearts-bg')
    function createHeart() {
        const heart = document.createElement('div')
        heart.classList.add('heart-particle')
        heart.innerHTML = ['❤️', '💖', '✨', '💕', '💍', '🌸'][Math.floor(Math.random() * 6)]
        heart.style.setProperty('--left', Math.random() * 100 + 'vw')
        heart.style.setProperty('--duration', Math.random() * 3 + 4 + 's')
        heart.style.setProperty('--size', Math.random() * 1.5 + 0.8 + 'rem')
        heartsBg.appendChild(heart)

        setTimeout(() => {
            heart.remove()
        }, 8000)
    }
    setInterval(createHeart, 200)
}

function launchConfetti() {
    const colors = ['#ff4d6d', '#ff8fa3', '#c9184a', '#ffb3c1', '#ffffff', '#ffdf00']
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
            return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
    }, 250)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

