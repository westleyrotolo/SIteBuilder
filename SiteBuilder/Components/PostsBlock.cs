using System;
using Piranha.Extend;
using Piranha.Extend.Fields;

namespace SiteBuilder.Components
{

    [BlockType(Name = "Posts", Category = "Content",
    Icon = "fas fa-newspaper", Component = "posts-block")]
    public class PostsBlock : Block
    {
        public TextField Name { get; set; }
        public NumberField MaxPosts { get; set; }
    }
}
