# TODO: Optimize Scrolling Performance

- [x] Update Lenis lerp value in Projects.tsx from 0.2 to 0.4 for less aggressive smoothing
- [x] Remove useSpring wrapper in Projects.tsx and use scrollYProgress directly for y transforms (y, y2, y3, y4)
- [x] Adjust spring parameters in ScrollyVideo.tsx: set damping to 30 and stiffness to 500 for snappier video updates
