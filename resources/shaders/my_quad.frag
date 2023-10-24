#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;  
} surf;

void main()
{
  vec4 colors[9];

  colors[0] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1,  1));
  colors[1] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0,  1));
  colors[2] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1,  1));
  colors[3] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1,  0));
  colors[4] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0,  0));
  colors[5] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1,  0));
  colors[6] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, -1));
  colors[7] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0, -1));
  colors[8] = textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1, -1));

  vec4 averageColor = vec4(0.0);
  for (int i = 0; i < colors.length(); i++)
  {
      averageColor += colors[i];
  }
  averageColor /= float(colors.length());

  color = averageColor;
}
