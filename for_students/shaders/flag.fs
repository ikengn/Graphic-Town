varying vec2 v_uv;
uniform vec3 color;
const float PI = 3.14;

vec2 zigzag(vec2 _st, float _zoom){
    _st *= _zoom;
    if (fract(_st.y * 0.5) > 0.5){
        _st.x = _st.x+0.5;
        _st.y = 1.0-_st.y;
    }
    return fract(_st);
}

float fillY(vec2 _st, float pct, float antia){
  return smoothstep(pct - antia, pct, _st.y);
}

void main(){
  vec2 v_uv = v_uv;
  vec3 color = vec3(0.0);

  v_uv = zigzag(v_uv * vec2(1.0,2.0),5.0);
  float x = v_uv.x * 2.0;
  float color1 = floor(1.0 + sin(x * PI));
  float color2 = floor(1.0 + sin((x + 1.0) * PI));
  float f = fract(x);

  color = vec3(fillY(v_uv,mix(color2,color1,f),0.01));

  gl_FragColor = vec4(color, 1.0);
}