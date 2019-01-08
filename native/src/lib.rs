#[macro_use]
extern crate neon;

use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
  let args_length = cx.len();
  println!("args length: {}", args_length);
  let name = cx.argument::<JsString>(0)?.value();
  Ok(cx.string(String::from("hello ") + &name))
}

fn thread_count(mut cx: FunctionContext) -> JsResult<JsNumber> {
  Ok(cx.number(num_cpus::get() as f64))
}

fn decodeFile(mut cx: FunctionContext) -> JsResult<JsString> {
  let filePath = cx.argument::<JsString>(0)?.value();
  // readfile
  // decoding 
  // return file or write file
}

register_module!(mut cx, {
    cx.export_function("hello", hello);
    cx.export_function("threadCount", thread_count);
    Ok(())
});
