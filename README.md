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

**Future work: Reverse frames going from right to left instead of default left
to right: makes smoother animation but not important now**

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

## Future work

## Things to improve
