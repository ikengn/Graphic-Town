varying vec2 v_uv;

/* colors for the checkerboard */
uniform vec3 light;
uniform vec3 dark;

/* number of checks over the UV range */
uniform float checks;

void main()
{
    float x = v_uv.x * checks;
    float y = v_uv.y * checks;

    float xc = floor(x);
    float yc = floor(y);

    float dc = step(1.0, mod(xc + yc, 2.0));
    vec3 color = mix(light, dark, dc);

    gl_FragColor = vec4(color, 1.0);
}