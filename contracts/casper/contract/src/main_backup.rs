#![no_std]
#![no_main]

extern crate alloc;

use alloc::{string::ToString, vec};

use casper_contract::contract_api::{runtime, storage};

use casper_types::{
contracts::{EntryPoint, NamedKeys},
CLType,
EntryPointAccess,
EntryPointType,
EntryPoints,
};

#[no_mangle]
pub extern "C" fn register_user() {}

#[no_mangle]
pub extern "C" fn call() {
let mut entry_points = EntryPoints::new();

```
entry_points.add_entry_point(
    EntryPoint::new(
        "register_user",
        vec![],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Called,
    )
    .into(),
);

let named_keys = NamedKeys::new();

let (contract_hash, _) = storage::new_contract(
    entry_points,
    Some(named_keys),
    Some("trust_agent_package_hash".to_string()),
    Some("trust_agent_access".to_string()),
    None,
);

runtime::put_key(
    "trust_agent_contract_hash",
    contract_hash.into(),
);
```

}
