package ma.rafik.productapp.controller;

import ma.rafik.productapp.model.Product;
import ma.rafik.productapp.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(defaultValue = "") String name_like,
            @RequestParam(defaultValue = "1") int _page,
            @RequestParam(defaultValue = "4") int _limit) {

        Page<Product> page = productRepository
                .findByNameContainingIgnoreCase(name_like, PageRequest.of(_page - 1, _limit));

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Total-Count", String.valueOf(page.getTotalElements()));

        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productRepository.save(product));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,
                                                  @RequestBody Product updated) {
        return productRepository.findById(id).map(p -> {
            p.setName(updated.getName());
            p.setPrice(updated.getPrice());
            p.setChecked(updated.isChecked());
            return ResponseEntity.ok(productRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/products/{id}")
    public ResponseEntity<Product> patchProduct(@PathVariable Long id,
                                                 @RequestBody java.util.Map<String, Object> patch) {
        return productRepository.findById(id).map(p -> {
            if (patch.containsKey("checked")) {
                p.setChecked((Boolean) patch.get("checked"));
            }
            if (patch.containsKey("name")) {
                p.setName((String) patch.get("name"));
            }
            return ResponseEntity.ok(productRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
