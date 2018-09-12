import Layout from '../../../../components/layout'

export default ({children,location}) => (
  <Layout>
    <h1>My Layout {location.pathname}</h1>
    <div>{children}</div>
  </Layout>
)

# h1 शीर्षक
## h2 शीर्षक
### h3 शीर्षक

अनुच्छेद का उदाहरण.
*तिरछा*, **बोल्ड**, and `मोनोस्पेस` का उदाहरण.

सूची का उदाहरण:
 
  * पहला
  * दूसरा
  * तीसरा

~~~
//कोड उदाहरण
define foobar() {
    print "अपूर्व चौहान";
}
~~~