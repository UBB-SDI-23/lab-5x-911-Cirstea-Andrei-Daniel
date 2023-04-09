package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Model.CarsOnPurchaseDTO;
import com.example.mpp1.Repository.CarsOnPurchaseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/carsonpurchases")
public class CarsOnPurchaseController {

    @Autowired
    private CarsOnPurchaseRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public List<CarsOnPurchaseDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping()
    public CarsOnPurchase createCarsOnPurchase(@RequestBody CarsOnPurchase carsOnPurchase) {
        return repository.save(carsOnPurchase);
    }

//    @PostMapping("/cars/{id}/shipment")
//    public CarsOnPurchase createCarsOnPurchase(@RequestBody CarsOnPurchaseDTO dto, @PathVariable("id") Long id) {
//        return repository.
//    }

    @PostMapping("/create")
    public List<CarsOnPurchase> createCarOnPurchases(@RequestBody List<CarsOnPurchase> carsOnPurchases) {
        List<CarsOnPurchase> final_list = new ArrayList<CarsOnPurchase>();
        for (int index = 0; index < carsOnPurchases.size(); index++) {
            CarsOnPurchase current = carsOnPurchases.get(index);

            int subindex = index - 1;
            for (; subindex >= 0; subindex--) {
                CarsOnPurchase compare_cars_on_purchase = carsOnPurchases.get(subindex);
                if (compare_cars_on_purchase.getId().equals(current.getId()) &&
                        compare_cars_on_purchase.getCarModel().getId().equals(current.getCarModel().getId())
                && compare_cars_on_purchase.getPurchase().getId().equals(current.getPurchase().getId())) {
                    break;
                }
            }

            if (subindex < 0) {
                final_list.add(current);
            }
        }

        return repository.saveAll(final_list);
    }

    @GetMapping("/{id}")
    public CarsOnPurchase findID(@PathVariable("id") Long id) {
        return repository.findById(id).get();
    }

    @PutMapping("/{id}")
    public CarsOnPurchase updateCarOnPurchase(@RequestBody CarsOnPurchase carsOnPurchase, @PathVariable("id") Long id){
        CarsOnPurchase old_carsOnPurchase = findID(id);
        old_carsOnPurchase = carsOnPurchase;
        return repository.save(old_carsOnPurchase);
    }

    @DeleteMapping("/{id}")
    public String deleteCarsOnPurchase(@PathVariable("id") Long id){
        repository.deleteById(id);
        return "CarsOnPurchase successfully deleted";
    }

    private CarsOnPurchaseDTO convertToDto(CarsOnPurchase element) {
        return modelMapper.map(element, CarsOnPurchaseDTO.class);
    }

}
