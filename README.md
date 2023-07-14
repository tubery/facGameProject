# 2d Pixel Game

## Summary

2d Pixel game where the player tries to survive waves of enemies of increasing
difficulty.

## Process

I learned how to use the canvas following
[Franks laboratory](https://www.youtube.com/c/Frankslaboratory) on youtube.
After Going through lots of his videos, I created this game.

The main file is "app.js" This folder acts as the main file, which passes down
the game's information to other files so they can use certain properties.

Learning this process was quite simple, as I have worked with ReactJS. This is
similar to using the context API or passing down props.

The two main methods that appear in almost every file are update() and draw().
These two are self-explanatory one draws the content, and the other runs
constantly to update the properties.

When creating this, I noticed quite a lot of math popping up in the game. This
is especially apparent in the enemy movement. Wrapping my head around the sin
wave on enemy movements and making them appear in random spots was a hurdle for
me.

Another one was the deltaTime variable which calculates the time between frames.
DeltaTime keeps the game constant on different machines. Math-related things
need researching the most for me.

I figured out how to add left-side sprite animations on my own, which I was
happy with as initially, all sprites went from right to left. And in the
beginning, the sprites were animating backwards.

Overall I enjoyed the process, and this has gotten me more interested in game
development. Maybe I can learn it on the side when I am free. I want to bring my
vision to life.

## Inspiration

Since playing games at my cousin's house, I've always wanted to create a game.
In the beginning, I tried to make a 2d sidescroller game without HTML canvas,
and it did not go well, leading me to scrap the entire plan and watch videos on
HTML canvas.

I last played a 2d pixel game a long time ago and wanted to create something
simple in this short period.

The initial plan was to have a dynamic platformer with lots of movement and
platforms with random enemy spawns. Each time the player would have to go
through waves, finally reaching a final boss that would have different mechanics
compared to the simple enemies I have.

But I have only been able to implement this current build with the time I have.

## Personal / Dev Notes

**11/07/23**

### Summary

-   Acquired assets
-   Code has more comments than usual as I'm completely new to canvas
-   Sprite movement is partially done
-   Problem with left animations
-   Unhappy with controls but will have to do

5 Days until the deadline. I have spent the last four learning how to use JS
canvas. I am not sure if I can make the deadline, but I will give it the best I
can as I know I have the drive and skills

Goals for today

Get as much done today as possible. There is no concrete plan as there aren't
enough days left. The game will be a fixed height and width and can only play on
laptops and up.

I have picked all the assets and backgrounds. This is difficult as they have
provided components for my theme. I have to stitch them together using a program
called Tiled, which I will do and create an area for the player to move around.

There are more comments than usual as I am still determining when I will make
another game, but it will be useful if I ever do, and I can come back to it and
have it help me remember things. This will also help my understanding as I can
explain my code through the comments.

The sprite movement took much longer than I expected it to. I had to flip the
images of each sprite so there is animation for left and right instead of having
one set of animations for each action towards the right.

I managed to get the horizontal and vertical movement; however, there is a bug
with animation frames jumping left but not right for some reason. I think it is
due to the mirrored image. The frame starts from the last frame since it is now
at the beginning.

Not as responsive as my first implementation, but it will have to do for now.
I've spent too much time tuning this, so I will move on.

**Future work: Create a hybrid input handler of the first implementation and
current or find a better way to respond to user input**

### Things for tomorrow

1. Implement jump without horizontal movement
2. Attacks
3. Hitbox
4. Single Enemy
5. Background
6. Collision blocks
7. Collision
8. Platform Jumping
9. Camera Panning
10. Enemy Spawning
11. Enemy Attacks
12. Difficulty / Waves
13. Health
14. Buffs
15. Game Over conditions

-   **Reminder to self, remove PSD files from assets when free**

## 12/07/23

### Summary

-   Compensated responsiveness with more movement options
-   The player has to let animation play when committing the attack
-   Two new properties to compensate for left animations from the mirror sprite
    sheet
-   Controls still not as wanted
-   Enemies successfully spawned one
-   The sprite sheet for jump attacks is not working well with my jumps
-   Small character sprite compared to enemies, not enough skill/time to scale
    in an image editor
-   Allow player to regain lives via killing multiples of 10 enemies
-   Ghosts spawned at the top but haven't figured out how to spawn left to right
-   As the player kills more enemies, the game gets harder by adding different
    types of enemies

Instead of implementing a new state of a jump without horizontal movement, I
have allowed the player to move during the jump and fall instead to compensate.

For the attack, I force the player to follow through with the animation rather
than allowing cancellation during any frame to disallow spamming attacks. Since
I don't have sprite animations for running attacks, for now, I will only allow
attacks in idle.

After finding out my left animations are playing in reverse due to me mirroring
the images and the frameX going from left to right, I have tried to rectify it
using a cloned object with the property subtracting frames instead of
increasing, but having no success since the object properties are passed by
reference it keeps changing, I solved this by making two new properties
this.leftSide and this.frameXLeft starting the animation from the right side

The solution above has changed something in my code, making it less responsive
in movement. I think the best solution would be to photoshop the original images
and put them in the correct order for left animations going from left to right
as all others have, but that would take a lot of time, so this workaround will
have to do

The jump attacks aren't what I expected, so I will not implement them into the
game. Instead, the user can do a normal attack mid-air, but the animation is not
smooth.

I will spawn one for the enemy right now and ensure hitboxes work with the
player and enemy. When I progress, I can add more complex enemies, patterns, and
attacks.

I have implemented enemies and hitboxes; however, my character is quite small. I
have yet to work out the maths for scaling my character, so I would like to try
scaling the images with an editor, but that is a luxury.

**Scale sprites/game to wanted sizes**

Since the game is not as responsive as I would like, I added ways to regain
lives to make it a bit more forgiving. This is done by having scores in
multiples of 10

I need to figure out a way to get enemies to spawn on different sides, too, so
in the future, when I have platforms, I can use them.

I've changed to the spawning of ghosts for when the player reaches a certain
score. This would increase difficulty. Ideally, I would give the player another
reward, such as another attack for going higher, but I need to find a better
sprite sheet, and if I had more enemies, I could keep increasing enemy types and
change spawn chances.

1. ~~Implement jump without horizontal movement~~
2. ~~Attacks~~
3. ~~Hitbox~~
4. ~~Single Enemy~~
5. Background
6. Collision blocks
7. ~~Collision~~
8. Platform Jumping
9. Camera Panning
10. ~~Enemy Spawning~~
11. Enemy Attacks
12. Difficulty / Waves
13. ~~Health~~
14. Buffs
15. Game Over conditions

I've managed to cross off quite a bit of my to-do list; however, it still feels
like I am so far away from my goal I will make this an MVP rather than what I
had envisioned.

For tomorrow

1. Enemy projectiles
2. Different player sprite - currently too small
3. Background
4. Platforms
5. Difficulty
6. Different Spawns
7. Display the difficulty level on the screen
8. Win/Lose conditions

## 13/07/23

### Summary

-   New Sprite hitbox is too large
-   Workaround on fall png not working
-   3 hit combos implemented
-   Fixed hitboxes for players and attacks
-   Added collision animations, but they are not working properly on hits
-   Win conditions, game over, restart

I changed the sprite to something bigger, but now the character hitbox is too
large. I will have to fix it. The images for the falling animation were not
working, so I had to revert to a different way of loading images using a new
image rather than the DOM.

I also managed to get three hit combos to work with the character. Allowing the
player to press attack again after each animation is done playing.

I have fine-tuned the hitboxes for the character and made it smaller than the
sprite's size. I have also changed the attack hitboxes to match close to the
weapon instead of filling the size of the sprite image.

I've gotten collisions working. However, the collisions work for the player and
animate in the correct position, but when the player hits the enemy, the hit is
in the wrong spot. My suspicion is that the hitbox changes when the player
attacks meaning this could be solved mathematically, but I have been unable to
solve it.

Implemented win conditions, restart and game over state. I have yet to decide on
the exact numbers fully, but I can change them since they are in place now.

The next thing is to increase the difficulties, enemies, background, and
platforms.

1. Enemy projectiles
2. ~~Different player sprite - current too small~~
3. Background
4. Platforms
5. Difficulty
6. Different Spawns
7. ~~Display difficulty level on screen~~
8. ~~Win/Lose conditions~~
9. ~~Hitboxes~~
10. ~~Different attacks~~
11. ~~Collisions~~

For tomorrow

1. Enemy projectiles
2. Background
3. Platforms
4. Difficulty
5. More enemies
6. Different spawn locations

## 14/07/23

### Summary

-   Added another enemy
-   Added left spawns for enemies
-   Added difficulty changes
-   Background added

Today I will add one more enemy and another difficulty increase, which should be
the last of enemy interactions. An additional enemy can now spawn on the left
side, and as the game difficulty increases, so does the game's speed. This
should provide enough of a difficult challenge for a short game. I have also
added a background to the game, which makes it a little nicer.

This will be the last update, as I will need time to fill in the questions for
the application and deploy it.

1. Enemy projectiles
2. ~~Background~~
3. Platforms
4. ~~Difficulty~~
5. ~~More enemies~~
6. ~~Different spawn locations~~
