using Piranha.AttributeBuilder;
using Piranha.Models;

namespace SiteBuilder.Models
{

    [PostType(Title = "Standard post")]
    public class StandardPost  : Post<StandardPost>
    {
    }
}
