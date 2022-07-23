using Piranha.AttributeBuilder;
using Piranha.Models;

namespace SiteBuilder.Models
{
    [PageType(Title = "Standard archive", IsArchive = true)]
    public class StandardArchive : Page<StandardArchive>
    {
    }
}
