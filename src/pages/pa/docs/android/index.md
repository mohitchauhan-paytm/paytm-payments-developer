import Layout from '../../../../components/layout'

export default ({children,location}) => (
  <Layout>
    <h1>My Layout {location.pathname}</h1>
    <div>{children}</div>
  </Layout>
)

# h1 ਸਿਰਲੇਖ
## h2 ਸਿਰਲੇਖ
### h3 ਸਿਰਲੇਖ

ਪੈਰਾ ਦੀ ਉਦਾਹਰਨ.
*ਇਟਾਲੀਕ*, **ਬੋਲਡ**, and `ਮੋਨੋਸਪੇਸ` ਦੀ ਉਦਾਹਰਨ.

ਸੂਚੀ ਦਾ ਉਦਾਹਰਨ:
 
  * ਪਹਿਲਾ
  * ਦੂਜਾ
  * ਤੀਜਾ

~~~
//ਕੋਡ ਉਦਾਹਰਨ
define foobar() {
    print "ਅਪੂਰਵ ਚੌਹਾਨ";
}
~~~