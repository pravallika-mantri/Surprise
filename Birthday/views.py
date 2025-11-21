from django.shortcuts import render

def index(request): return render(request, 'birthday/index.html')

def home(request):
    slides = [
        {'image': 'images/2.jpg', 'caption': 'Your smile brightens every moment ❤️'},
        {'image': 'images/3.jpeg', 'caption': 'Ur away but always close in heart 💜'},
        {'image': 'images/5.jpg', 'caption': 'Can’t wait to celebrate together soon 🎂'},
        {'image': 'images/4.jpg', 'caption': 'Your smile lights up my world, even from miles away 🌍❤️'},
        {'image': 'images/6.jpg', 'caption': 'I miss our late-night talks & laughter 😢'},
        {'image': 'images/9.jpeg', 'caption': 'Three years apart, yet I feel you close in every memory 💌✨'},
        {'image': 'images/7.jpeg', 'caption': 'Your presence is missed, but your love is always with me 💕😘'},
        {'image': 'images/8.jpg', 'caption': 'Every photo reminds me of the joy you bring into my life 🌸💛'},
        {'image': 'images/1.jpg', 'caption': 'Distance can’t dim the bond we share you’re always with me 🕊🥰️'},
        {'image': 'images/10.jpg', 'caption': 'Happy Birthday Akka! I love you endlessly 💖🎈'},
    ]
    return render(request, 'birthday/home.html', {'slides': slides})

def gift(request): return render(request, 'birthday/gift.html')
def game(request): return render(request, 'Birthday/minigame.html')
def poem(request): return render(request, 'Birthday/poem.html')
def confetti(request): return render(request, 'Birthday/confetti.html')
def secret(request): return render(request, 'Birthday/secret.html')
def story(request): return render(request, 'Birthday/story.html')
def scratch(request): return render(request, 'Birthday/scratch.html')
def spin(request): return render(request, 'Birthday/spin.html')
def treasure(request): return render(request, 'Birthday/treasure.html')
def wish(request): return render(request, 'Birthday/wish.html')
def love(request):return render(request, 'Birthday/love.html')
def letter(request): return render(request, 'Birthday/letter.html')
def message(request): return render(request, 'Birthday/message.html')
def cake3d(request): return render(request, 'Birthday/cake3d.html')