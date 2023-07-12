# 2d Pixel Game

## Summary

2d Pixel game where the player tries to survive waves of enemies of increasing
difficulty

## Files / Folder Overview

### app.js

Main file which holds the game state and initializes the game loop

Things get initiliazed with property set e.g this.player = new Player, the game
object is then passed to the player giving it access

The game class holds and runs every javascript files update / draw method within
the custom animate function

## Personal / Dev Notes

**11/07/23**

### Summary of today

-   Acquired assets
-   Code has more comments than usual as Im completely new to canvas
-   Sprite movement partially done
-   Problem with left animations
-   Unhappy with controls but will have to do

5 Days until the deadline I have spent the last four learning how to use JS
canvas I am not sure if I can make the deadline but I will give it the best I
can as I know I have the drive and skills

Goals for today

Get as much done today as possible. There is no concrete plan as there isnt
enough days left. Game will be a fixed height and width and will only be able to
play on laptops and up

I have picked all the assets and backgrounds this is difficult as they have
provided components for my theme I have to stitch them together myself using a
program called Tiled which I will do and create an area of sorts for the player
to move around

This will have more comments then usual as I am not sure when I will make
another game but it will be useful if I ever do and I can come back to it and
have it help me remember things, this will also help my understanding as I can
explain my code through the comments

Sprite movement took much longer than I expected it to. I had to flip the images
of each sprite so there is animation for left and right instead of having one
set of animations for each action towards the right

Managed to get the horizontal and vertical movement however there is a bug with
animation frames on jumping right but not left for some reason, I think its due
to the mirrored image the frame is starting from the last frame since it is now
at the beginning

Not as responsive as my first implementation but it will have to do for now Ive
spent too much time tuning this so I will move on

**Future work: Create hybrid input handler of first implementation and current
or find better way to respond to user input**

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

### Summary of today

-   Compensate responsiveness with more movement options
-   Player has to let animation play when commiting attack
-   Two new properties to compensate for left animations from mirror sprite
    sheet
-   Controls still not as wanted
-   Enemies successfly spawned one
-   Sprite sheet for jump attacks not working well with my jumps
-   Small character sprite compared to enemies, not enough skill / time to scale
    in image editor
-   Allow player to regain lives via killing multiples of 10 enemies
-   Ghosts spawned at top but havent figured out how to spawn left to right
-   As player kills more enemies the game gets harder by adding different types
    of enemies

Instead of implementing a new state of a jump without horizontal movement I have
allowed the player to move during jump and fall instead to compensate

For the attack I force the player to follow threough the animation rather than
allowing cancellation during any frame to disallow spamming attacks, since I
dont have sprite annimations for running attacks for now I will only allow
attacks in idle

After finding out my left animations are playing in reverse due to me mirroring
the images and the frameX going from left to right I have tried to rectify it
using a cloned object with the property subtracting frames instead of increasing
but having no success since object properties are passed by reference it keeps
chaning, to solve this I have made two new properties this.leftSide and
this.frameXLeft starting the animation from the right side

The solution above has changed something in my code making it less responsive in
movement. I think the best solution would be to photoshop the original images
and put them in the correct order for left animations going from left to right
as all others have but that would take a lot of time so this workaround will
have to do

The jump attacks arent what I expected so I will not implement them into the
game instead the user can do a normal attack mid air but the animation is not
smooth

For enemies right now I will spawn one and make sure hitboxes work with the
player and ememy. When I make progress I can add more complex enemies and
patterns and attacks.

I have implemented enemies and hitboxes however my character is quite small, I
havent worked out the maths for scaling my character so I would would like to
try scaling the images with an editor but that again is a luxury

**Scale sprites/game to wanted sizes**

Since the game is not as responsive as I would like I added in ways to regain
lives to make it a bit more forgiving this is done by having a scores in
multiples of 10

I need to figure out a way to get enemies to spawn on different sides too so in
the future when I have platforms I can use them

Ive changed to spawning of ghosts for when the player reaches a certain score
this would increase difficulty, ideally I would give the player another reward
such as another attack for going higher but I need to find a better sprite sheet
and if I had more enemies I could keep increasing enemy types and change spawn
chances

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

Ive managed to cross off quite a bit of my todo list however it still feels like
I am so far away from my goal I think I will make this an MVP rather than what I
had envisioned

For tomorrow

1. Enemy projectiles
2. Different player sprite - current too small
3. Background
4. Platforms
5. Difficulty
6. Different Spawns
7. Display difficulty level on screen by amount of new enemies
8. Win/Lose conditions

## Future work

## Things to improve
