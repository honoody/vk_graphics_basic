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

  for (int i = 0; i < 9; i++)
  {
      for (int j = 0; j < 9 - i - 1; j++)
      {
          vec4 ma = max(colors[j], colors[j+1]);
          vec4 mi = min(colors[j], colors[j+1]);
          colors[j] = mi;
          colors[j+1] = ma;
      }
  }

  color = colors[4];
}
